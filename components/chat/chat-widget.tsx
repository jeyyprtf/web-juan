"use client";

import { Bot, MessageCircle, Send, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type ChatMsg = { role: "user" | "assistant"; content: string };

const WELCOME =
  "Hai! Aku JuanBot — tanya soal Juan, project, skill, atau cara kontak. Di luar itu aku skip ya.";

export function ChatWidget(): ReactNode {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    inputRef.current?.focus();
  }, [open, messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: ChatMsg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m.content !== WELCOME),
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      const reply =
        data.message ||
        data.error ||
        "Maaf, gagal jawab. Coba lagi sebentar.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Koneksi error. Coba lagi ya.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    void send();
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[110] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <div
          className="pointer-events-auto flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-2xl shadow-black/15 dark:shadow-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <header className="flex items-center justify-between gap-3 border-b border-foreground/8 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="bg-foreground text-background inline-flex h-8 w-8 items-center justify-center rounded-xl">
                <Bot className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p
                  id={titleId}
                  className="text-foreground text-[14px] font-semibold tracking-tight"
                >
                  JuanBot
                </p>
                <p className="text-foreground/50 text-[11px] tracking-tight">
                  CS · juan.web.id
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="focus-ring text-foreground/50 hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-lg"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={listRef}
            className="flex max-h-[min(55vh,24rem)] min-h-56 flex-col gap-2.5 overflow-y-auto px-3 py-3"
          >
            {messages.map((m, i) => (
              <div
                key={`${i}-${m.role}`}
                className={
                  m.role === "user"
                    ? "bg-foreground text-background ml-8 rounded-2xl rounded-br-md px-3 py-2 text-[13px] leading-relaxed"
                    : "bg-foreground/5 text-foreground/85 mr-6 rounded-2xl rounded-bl-md px-3 py-2 text-[13px] leading-relaxed"
                }
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            ))}
            {loading ? (
              <p className="text-foreground/45 px-1 text-[12px]">JuanBot ngetik…</p>
            ) : null}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-foreground/8 p-2.5"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang Juan…"
              maxLength={2000}
              disabled={loading}
              className="focus-ring text-foreground placeholder:text-foreground/35 bg-foreground/3 h-10 min-w-0 flex-1 rounded-xl border border-foreground/8 px-3 text-[13px] outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="focus-ring bg-foreground text-background inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring pointer-events-auto bg-foreground text-background inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] active:scale-95"
        aria-label={open ? "Close chat" : "Open JuanBot chat"}
        aria-expanded={open}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
