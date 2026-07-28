"use client";

import { useEffect, type ReactNode } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <p className="text-foreground/50 text-sm font-medium tracking-tight">
        Error
      </p>
      <h1 className="font-serif text-[2.5rem] font-medium tracking-tight text-foreground sm:text-[3rem]">
        Something went wrong
      </h1>
      <p className="max-w-[36ch] text-[17px] leading-relaxed text-foreground/65">
        An unexpected error occurred. You can try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="focus-ring border-foreground/8 hover:bg-foreground/5 mt-2 inline-flex cursor-pointer rounded-xl border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
