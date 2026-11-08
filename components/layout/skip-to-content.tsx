import type { ReactNode } from "react";
import { Trans } from "@/lib/language";

export function SkipToContent(): ReactNode {
  return (
    <a href="#main-content" className="skip-to-content">
      <Trans en="Skip to main content" id="Langsung ke konten utama" />
    </a>
  );
}
