"use client";

import { useState, type ReactNode } from "react";

import { Modal } from "@/components/ui/modal";
import { experience } from "@/lib/content";

type Entry = (typeof experience)[number];

export function Experience(): ReactNode {
  const [active, setActive] = useState<Entry | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Experience
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {experience.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => setActive(entry)}
                className="bg-background border-foreground/5 hover:border-foreground/15 focus-ring flex w-full cursor-pointer flex-col gap-2 rounded-3xl border p-4 text-left transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center text-[18px] font-semibold tracking-tight text-white ring-1 ring-foreground/8 dark:ring-white/10"
                    style={{
                      borderRadius: 14,
                      backgroundColor: entry.brand,
                    }}
                    aria-hidden="true"
                  >
                    {entry.company.charAt(0)}
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                      {entry.company}
                    </span>
                    <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                      {entry.role}
                      <span className="text-foreground/30 mx-2">•</span>
                      <span className="text-foreground/55">{entry.period}</span>
                    </span>
                  </div>
                </div>
                <p className="text-foreground/60 line-clamp-2 pl-16 text-[13px] leading-[1.6] tracking-tight sm:text-[14px]">
                  {entry.description}
                </p>
                <span className="text-foreground/45 pl-16 text-[12px] font-medium">
                  View details ↗
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.company ?? "Experience"}
      >
        {active ? (
          <div className="flex flex-col gap-4">
            <p className="text-foreground/65 text-[15px]">
              {active.role}
              <span className="text-foreground/30 mx-2">•</span>
              {active.period}
            </p>
            <p className="text-foreground/75 text-[16px] leading-relaxed">
              {active.detail}
            </p>
            <ul className="flex flex-col gap-2">
              {active.highlights.map((h) => (
                <li
                  key={h}
                  className="bg-foreground/4 text-foreground/80 rounded-2xl px-4 py-3 text-[14px]"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
