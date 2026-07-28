import Link from "next/link";
import type { ReactNode } from "react";

export default function NotFound(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <p className="text-foreground/50 text-sm font-medium tracking-tight">
        404
      </p>
      <h1 className="font-serif text-[2.5rem] font-medium tracking-tight text-foreground sm:text-[3rem]">
        Page not found
      </h1>
      <p className="max-w-[36ch] text-[17px] leading-relaxed text-foreground/65">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="focus-ring border-foreground/8 hover:bg-foreground/5 mt-2 inline-flex rounded-xl border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors"
      >
        Back home
      </Link>
    </main>
  );
}
