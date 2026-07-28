import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { certifications, profile } from "@/lib/content";

const ROW_HEIGHT = 56;

export function Certifications(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
          Certifications & Courses
        </h3>
        <Link
          href={profile.certsDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-foreground/60 hover:text-foreground transition-colors"
        >
          View all
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {certifications.map((entry) => (
            <li
              key={`${entry.title}-${entry.year}`}
              className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border px-4 py-3"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <span
                className="border-foreground/15 inline-flex h-10 w-10 shrink-0 items-center justify-center border"
                aria-hidden="true"
                style={{ borderRadius: 12 }}
              >
                <span className="text-foreground/60 text-[15px] font-semibold tracking-tight">
                  {entry.issuer.charAt(0)}
                </span>
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[15px] font-semibold tracking-tight sm:text-[16px] leading-tight">
                  {entry.title}
                </span>
                <span className="text-foreground/65 mt-0.5 text-[13px] tracking-tight sm:text-[14px]">
                  {entry.issuer}
                  <span className="text-foreground/30 mx-2">•</span>
                  <span className="text-foreground/55">{entry.year}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
