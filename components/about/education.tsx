"use client";

import { useState, type ReactNode } from "react";

import { Modal } from "@/components/ui/modal";
import { education } from "@/lib/content";

type Entry = (typeof education)[number];

export function Education(): ReactNode {
  const [active, setActive] = useState<Entry | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Education
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {education.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => setActive(entry)}
                className="bg-background border-foreground/5 hover:border-foreground/15 focus-ring flex w-full cursor-pointer items-center gap-4 rounded-3xl border p-2 text-left transition-colors"
                style={{ minHeight: 64 }}
              >
                <span
                  className="border-foreground/15 text-foreground/60 inline-flex h-12 w-12 shrink-0 items-center justify-center border text-[18px] font-semibold tracking-tight"
                  aria-hidden="true"
                  style={{ borderRadius: 14 }}
                >
                  {entry.school.charAt(0)}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                    {entry.school}
                  </span>
                  <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                    {entry.degree}
                    <span className="text-foreground/30 mx-2">•</span>
                    <span className="text-foreground/55">{entry.period}</span>
                  </span>
                </div>
                <span className="text-foreground/40 pr-2 text-[12px]">↗</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.school ?? "Education"}
      >
        {active ? (
          <div className="flex flex-col gap-3">
            <p className="text-foreground/65 text-[15px]">
              {active.degree}
              <span className="text-foreground/30 mx-2">•</span>
              {active.period}
            </p>
            <p className="text-foreground/75 text-[16px] leading-relaxed">
              {active.detail}
            </p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
