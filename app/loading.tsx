import type { ReactNode } from "react";

export default function Loading(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex min-h-[50vh] flex-1 items-center justify-center"
      aria-busy="true"
      aria-label="Loading"
    >
      <span className="bg-foreground/20 h-2 w-2 animate-pulse rounded-full" />
    </main>
  );
}
