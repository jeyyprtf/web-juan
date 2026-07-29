import { loadSystemPrompt } from "@/lib/chat-system";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

const BASE = process.env.JUAN_LLM_BASE ?? "https://tunnel.juan.web.id/v1";
const KEY = process.env.JUAN_LLM_KEY ?? "";
const MODEL = process.env.JUAN_LLM_MODEL ?? "jrs/gemma-4-31b-it";

// ponytail: in-memory IP rate limit; swap to Redis if multi-instance
const buckets = new Map<string, { n: number; t: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now - b.t > WINDOW_MS) {
    buckets.set(ip, { n: 1, t: now });
    return true;
  }
  if (b.n >= MAX_PER_WINDOW) return false;
  b.n += 1;
  return true;
}

export async function POST(req: Request): Promise<Response> {
  if (!KEY) {
    return NextResponse.json(
      { error: "Chat not configured (missing JUAN_LLM_KEY)" },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { messages?: Msg[] };
  try {
    body = (await req.json()) as { messages?: Msg[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const cleaned: Msg[] = [];
  for (const m of incoming.slice(-12)) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) continue;
    const content = String(m.content ?? "").trim().slice(0, 2000);
    if (!content) continue;
    cleaned.push({ role: m.role, content });
  }
  if (!cleaned.length || cleaned[cleaned.length - 1]?.role !== "user") {
    return NextResponse.json({ error: "Need a user message" }, { status: 400 });
  }

  const payload = {
    model: MODEL,
    messages: [
      { role: "system", content: loadSystemPrompt() },
      ...cleaned,
    ],
    temperature: 0.3,
    max_tokens: 700,
  };

  let upstream: Response;
  try {
    upstream = await fetch(`${BASE.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; JuanBot/1.0)",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return NextResponse.json({ error: "Upstream unreachable" }, { status: 502 });
  }

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return NextResponse.json(
      { error: "Upstream error", detail: errText.slice(0, 200) },
      { status: upstream.status === 429 ? 429 : 502 }
    );
  }

  const data = (await upstream.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = (data.choices?.[0]?.message?.content ?? "").trim();
  if (!content) {
    return NextResponse.json(
      {
        message:
          "Maaf, aku lagi blank. Coba tanya lagi soal Juan, project, atau kontak ya.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: content });
}
