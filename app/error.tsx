"use client";

import { useEffect, type ReactNode } from "react";
import { Trans } from "@/lib/language";

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
        <Trans en="Error" id="Kesalahan" />
      </p>
      <h1 className="font-serif text-[2.5rem] font-medium tracking-tight text-foreground sm:text-[3rem]">
        <Trans en="Something went wrong" id="Terjadi kesalahan" />
      </h1>
      <p className="max-w-[36ch] text-[17px] leading-relaxed text-foreground/65">
        <Trans en="An unexpected error occurred. You can try again." id="Terjadi kesalahan yang tidak terduga. Anda dapat mencoba lagi." />
      </p>
      <button
        type="button"
        onClick={reset}
        className="focus-ring border-foreground/8 hover:bg-foreground/5 mt-2 inline-flex cursor-pointer rounded-xl border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors"
      >
        <Trans en="Try again" id="Coba lagi" />
      </button>
    </main>
  );
}
