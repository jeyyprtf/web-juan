"use client";

import { Bot, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
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

const EASE = [0.22, 1, 0.36, 1] as const;

const WELCOME =
  "Hai! Aku JuanBot — tanya soal Juan, project, skill, atau cara kontak. Di luar itu aku skip ya.";

const SUGGESTIONS = [
  "Siapa Juan?",
  "Project unggulan?",
  "Cara kontak?",
] as const;

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
    const id = requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
    inputRef.current?.focus();
    return () => cancelAnimationFrame(id);
  }, [open, messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendText = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      const next: ChatMsg[] = [
        ...messages,
        { role: "user", content: trimmed },
      ];
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
        const data = (await res.json()) as {
          message?: string;
          error?: string;
        };
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
    },
    [loading, messages]
  );

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    void sendText(input);
  };

  const showSuggestions =
    messages.length <= 1 && !loading && messages[0]?.content === WELCOME;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[110] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 20, scale: 0.94, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="border-foreground/10 bg-background pointer-events-auto flex w-[min(100vw-2rem,22.5rem)] origin-bottom-right flex-col overflow-hidden rounded-3xl border shadow-2xl shadow-black/15 dark:shadow-black/50"
          >
            <header className="border-foreground/8 flex items-center justify-between gap-3 border-b px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <motion.span
                  layout
                  className="bg-foreground text-background relative inline-flex h-9 w-9 items-center justify-center rounded-xl"
                >
                  <Bot className="h-4 w-4" aria-hidden="true" />
                  <span className="absolute right-0.5 bottom-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-background" />
                </motion.span>
                <div className="min-w-0">
                  <p
                    id={titleId}
                    className="text-foreground text-[14px] font-semibold tracking-tight"
                  >
                    JuanBot
                  </p>
                  <p className="text-foreground/50 text-[11px] tracking-tight">
                    AI assistant · portfolio
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="focus-ring border-foreground/8 text-foreground/50 hover:text-foreground hover:bg-foreground/5 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex max-h-[min(52vh,22rem)] min-h-52 flex-col gap-2.5 overflow-y-auto px-3 py-3"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={`${i}-${m.role}-${m.content.slice(0, 12)}`}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className={
                      m.role === "user"
                        ? "bg-foreground text-background ml-8 rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] leading-relaxed tracking-tight"
                        : "bg-foreground/5 text-foreground/85 border-foreground/6 mr-5 rounded-2xl rounded-bl-md border px-3.5 py-2.5 text-[13px] leading-relaxed tracking-tight"
                    }
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-foreground/5 border-foreground/6 mr-5 inline-flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border px-3.5 py-2.5"
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="bg-foreground/40 h-1.5 w-1.5 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: d * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              ) : null}

              {showSuggestions ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.35, ease: EASE }}
                  className="mt-1 flex flex-wrap gap-2"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void sendText(s)}
                      className="focus-ring border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 text-foreground/70 cursor-pointer rounded-full border bg-background px-3 py-1.5 text-[12px] font-medium tracking-tight transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              ) : null}
            </div>

            <form
              onSubmit={onSubmit}
              className="border-foreground/8 flex items-center gap-2 border-t p-2.5"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya tentang Juan…"
                maxLength={2000}
                disabled={loading}
                className="focus-ring text-foreground placeholder:text-foreground/35 bg-foreground/[0.03] border-foreground/8 h-11 min-w-0 flex-1 rounded-xl border px-3.5 text-[13px] tracking-tight outline-none transition-colors"
              />
              <motion.button
                type="submit"
                disabled={loading || !input.trim()}
                whileTap={{ scale: 0.92 }}
                className="focus-ring bg-foreground text-background inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <LayoutGroup>
        <motion.button
          type="button"
          layout
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="focus-ring border-foreground/10 bg-foreground text-background pointer-events-auto relative inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border shadow-lg shadow-black/20"
          aria-label={open ? "Close chat" : "Open JuanBot chat"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="inline-flex"
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="msg"
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="inline-flex"
              >
                <MessageCircle className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
          {!open ? (
            <motion.span
              className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
        </motion.button>
      </LayoutGroup>
    </div>
  );
}
