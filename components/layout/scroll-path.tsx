"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion";

/** Decorative scroll-linked path along the left edge (desktop). */
export function ScrollPath(): ReactNode {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });
  const pathLength = useTransform(smooth, [0, 1], [0, 1]);
  const glowY = useTransform(smooth, [0, 1], ["0%", "100%"]);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-3 z-40 hidden h-full w-10 md:left-5 md:block lg:left-8"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M20 0 C 8 80, 32 160, 20 240 C 8 320, 32 400, 20 480 C 8 560, 32 640, 20 720 C 8 800, 32 880, 20 1000"
          className="stroke-foreground/10"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M20 0 C 8 80, 32 160, 20 240 C 8 320, 32 400, 20 480 C 8 560, 32 640, 20 720 C 8 800, 32 880, 20 1000"
          className="stroke-foreground/55"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
      <motion.span
        className="bg-foreground/70 absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full shadow-[0_0_12px_rgba(0,102,255,0.45)]"
        style={{ top: glowY }}
      />
    </div>
  );
}
