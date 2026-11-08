import Link from "next/link";
import type { ReactNode } from "react";
import { Trans } from "@/lib/language";

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
        <Trans en="Page not found" id="Halaman tidak ditemukan" />
      </h1>
      <p className="max-w-[36ch] text-[17px] leading-relaxed text-foreground/65">
        <Trans en="The page you’re looking for doesn’t exist or has been moved." id="Halaman yang Anda cari tidak ada atau telah dipindahkan." />
      </p>
      <Link
        href="/"
        className="focus-ring border-foreground/8 hover:bg-foreground/5 mt-2 inline-flex rounded-xl border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors"
      >
        <Trans en="Back home" id="Kembali ke beranda" />
      </Link>
    </main>
  );
}
