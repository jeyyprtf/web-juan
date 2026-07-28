"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { profile } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm(): ReactNode {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.location.href = href;
    window.setTimeout(() => setStatus("sent"), 400);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border-foreground/8 bg-background flex w-full flex-col gap-3 rounded-[1.1rem] border p-4 sm:p-5"
      noValidate
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-foreground/60 text-[12px] font-medium tracking-tight">
            Name
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="border-foreground/10 focus-ring bg-foreground/2 text-foreground placeholder:text-foreground/35 rounded-xl border px-3.5 py-2.5 text-[14px] outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-foreground/60 text-[12px] font-medium tracking-tight">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className="border-foreground/10 focus-ring bg-foreground/2 text-foreground placeholder:text-foreground/35 rounded-xl border px-3.5 py-2.5 text-[14px] outline-none"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-foreground/60 text-[12px] font-medium tracking-tight">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="What are you building?"
          className="border-foreground/10 focus-ring bg-foreground/2 text-foreground placeholder:text-foreground/35 resize-y rounded-xl border px-3.5 py-2.5 text-[14px] outline-none"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="focus-ring bg-foreground text-background inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {status === "sending" ? "Opening mail…" : "Send message"}
        </button>
        {status === "sent" && (
          <span className="text-foreground/55 text-[13px]">
            Opens your email app — or email{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-foreground/80 underline-offset-2 hover:underline"
            >
              {profile.email}
            </a>
          </span>
        )}
        {status === "error" && (
          <span className="text-[13px] text-red-500">
            Please fill in all fields.
          </span>
        )}
      </div>
    </form>
  );
}
