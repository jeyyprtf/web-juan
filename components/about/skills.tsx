"use client";

import { useState, type ReactNode } from "react";

import { Modal } from "@/components/ui/modal";
import { skills } from "@/lib/content";

type Entry = (typeof skills)[number];

export function Skills(): ReactNode {
  const [active, setActive] = useState<Entry | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        What I do
      </h3>
      <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => setActive(skill)}
              className="focus-ring border-foreground/8 hover:border-foreground/20 bg-background text-foreground/85 cursor-pointer rounded-full border px-4 py-2 text-[14px] tracking-tight transition-colors sm:text-[15px]"
            >
              {skill.label}
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.label ?? "Skill"}
      >
        {active ? (
          <p className="text-foreground/75 text-[16px] leading-relaxed">
            {active.detail}
          </p>
        ) : null}
      </Modal>
    </div>
  );
}
