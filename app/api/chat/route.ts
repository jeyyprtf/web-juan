import { loadSystemPrompt, sanitizeModelText } from "@/lib/chat-system";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; content: string };

const BASE = process.env.JUAN_LLM_BASE ?? "";
const KEY = process.env.JUAN_LLM_KEY ?? "";
const MODEL = process.env.JUAN_LLM_MODEL ?? "jr/gemini-3.5-flash-lite";

const MAX_BODY_BYTES = 32_000;
const MAX_MSG = 8;
const MAX_CHARS = 1200;
const MAX_TOKENS = 400;
const UPSTREAM_MS = 25_000;

// Dual window rate limit (in-memory; per instance)
const minuteBuckets = new Map<string, { n: number; t: number }>();
const hourBuckets = new Map<string, { n: number; t: number }>();
const MAX_PER_MIN = 10;
const MAX_PER_HOUR = 40;

function hit(
  map: Map<string, { n: number; t: number }>,
  key: string,
  windowMs: number,
  max: number
): boolean {
  const now = Date.now();
  const b = map.get(key);
  if (!b || now - b.t > windowMs) {
    map.set(key, { n: 1, t: now });
    return true;
  }
  if (b.n >= max) return false;
  b.n += 1;
  return true;
}

function rateLimit(ip: string): boolean {
  return (
    hit(minuteBuckets, ip, 60_000, MAX_PER_MIN) &&
    hit(hourBuckets, ip, 3_600_000, MAX_PER_HOUR)
  );
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function sse(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: Request): Promise<Response> {
  if (!KEY || !BASE) {
    return NextResponse.json(
      { error: "Chat not configured (missing JUAN_LLM_KEY or JUAN_LLM_BASE)" },
      { status: 503 }
    );
  }

  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak request. Coba lagi sebentar." },
      { status: 429 }
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: { messages?: Msg[]; stream?: boolean };
  try {
    body = JSON.parse(raw) as { messages?: Msg[]; stream?: boolean };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const wantStream = body.stream !== false;
  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const cleaned: Msg[] = [];
  for (const m of incoming.slice(-MAX_MSG)) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) continue;
    const content = String(m.content ?? "").trim().slice(0, MAX_CHARS);
    if (!content) continue;
    cleaned.push({ role: m.role, content });
  }
  if (!cleaned.length || cleaned[cleaned.length - 1]?.role !== "user") {
    return NextResponse.json({ error: "Need a user message" }, { status: 400 });
  }

  const payload = {
    model: MODEL,
    messages: [{ role: "system", content: loadSystemPrompt() }, ...cleaned],
    temperature: 0.25,
    max_tokens: MAX_TOKENS,
    stream: wantStream,
  };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), UPSTREAM_MS);

  let upstream: Response;
  try {
    upstream = await fetch(`${BASE.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
        Accept: wantStream ? "text/event-stream" : "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; JuanBot/1.1)",
      },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
  } catch (e) {
    clearTimeout(timer);
    const aborted = e instanceof Error && e.name === "AbortError";
    return NextResponse.json(
      {
        error: aborted
          ? "Timeout — coba lagi ya."
          : "Upstream unreachable",
      },
      { status: aborted ? 504 : 502 }
    );
  }

  if (!upstream.ok) {
    clearTimeout(timer);
    const errText = await upstream.text().catch(() => "");
    return NextResponse.json(
      { error: "Upstream error", detail: errText.slice(0, 200) },
      { status: upstream.status === 429 ? 429 : 502 }
    );
  }

  // Non-stream fallback
  if (!wantStream || !upstream.body) {
    clearTimeout(timer);
    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = sanitizeModelText(
      data.choices?.[0]?.message?.content ?? ""
    );
    return NextResponse.json({
      message:
        content ||
        "Maaf, aku lagi blank. Coba tanya lagi soal Juan, project, atau kontak ya.",
    });
  }

  // Stream: OpenAI-compatible SSE → our SSE {type,text}
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder();
      const push = (obj: unknown): void => {
        controller.enqueue(enc.encode(sse(obj)));
      };

      try {
        push({ type: "start" });
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n");
          buffer = parts.pop() ?? "";

          for (const line of parts) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data) as {
                choices?: { delta?: { content?: string } }[];
              };
              const piece = json.choices?.[0]?.delta?.content;
              if (piece) {
                push({ type: "token", text: piece });
              }
            } catch {
              /* skip bad chunk */
            }
          }
        }
        push({ type: "done" });
        controller.close();
      } catch {
        push({
          type: "error",
          text: "Stream terputus. Coba kirim ulang.",
        });
        controller.close();
      } finally {
        clearTimeout(timer);
        try {
          reader.releaseLock();
        } catch {
          /* */
        }
      }
    },
    cancel() {
      clearTimeout(timer);
      ctrl.abort();
      try {
        reader.cancel();
      } catch {
        /* */
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
