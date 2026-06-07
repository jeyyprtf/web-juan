"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";

const PORTRAIT_SRC = "/juan.webp";
const PORTRAIT_HOVER_SRC = "/juan_wave.webp";

const PortraitMorph = dynamic(
  () => import("./portrait-morph").then((m) => m.PortraitMorph),
  { ssr: false }
);

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <div className="hero-fade-in flex flex-col gap-4">
            <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
              Hey
              <span aria-hidden="true" className="mx-0.5">
                👋
              </span>
              , I&rsquo;m Juan
            </p>

            <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block whitespace-nowrap">
                AI Engineer &
              </span>
              <span className="block whitespace-nowrap">Specialist</span>
            </h1>

            <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
              Independent engineer focused and obsessed with anything about AI.
            </p>

            <HeroCtas />
          </div>

          <div className="hero-scale-unblur flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                {/* Static image for fast LCP — visible immediately */}
                <Image
                  src={PORTRAIT_SRC}
                  alt="Juan portrait"
                  fill
                  priority
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover grayscale"
                />
                {/* WebGL morph overlay — loaded after hydration */}
                <div className="absolute inset-0">
                  <PortraitMorph
                    srcA={PORTRAIT_SRC}
                    srcB={PORTRAIT_HOVER_SRC}
                    alt="Juan portrait"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
