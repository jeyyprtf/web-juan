import type { ReactNode } from "react";
import { Trans } from "@/lib/language";

export default function Loading(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex min-h-[50vh] flex-1 items-center justify-center"
      aria-busy="true"
      aria-labelledby="loading-label"
    >
      <span className="bg-foreground/20 h-2 w-2 animate-pulse rounded-full" />
      <span id="loading-label" className="sr-only"><Trans en="Loading" id="Memuat" /></span>
    </main>
  );
}
