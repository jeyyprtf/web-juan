import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type CertEntry = {
  title: string;
  issuer: string;
  year: string;
};

const ENTRIES: CertEntry[] = [
  {
    title: "IoT Intern Program",
    issuer: "Chickin Indonesia",
    year: "2024",
  },
  {
    title: "Expo Inovasi Vokasi (INOVAKS)",
    issuer: "Malang State Polytechnic",
    year: "2025",
  },
  {
    title: 'Sharing Session "Independent College Student Strategy"',
    issuer: "Anbim Yogyakarta",
    year: "2024",
  },
  {
    title: "ERP & Artificial Intelligence Future Technology Workshop",
    issuer: "Maspion IT Surabaya (Microsoft)",
    year: "2024",
  },
  {
    title: "Industrial IoT: Modbus RTU/TCP with MQTT & Node-RED",
    issuer: "PT Avisha Inovasi Indonesia",
    year: "2024",
  },
  {
    title: "Ardumeka Podcast Participant",
    issuer: "PT Avisha Inovasi Indonesia",
    year: "2025",
  },
];

const CERTS_DRIVE_LINK =
  "https://drive.google.com/drive/folders/1p31dzN7TkdrjkoSJEjeo_SXM9QQBFjTw?usp=sharing";

const ROW_HEIGHT = 56;

export function Certifications(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
          Certifications & Courses
        </h3>
        <Link
          href={CERTS_DRIVE_LINK}
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
          {ENTRIES.map((entry) => (
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
