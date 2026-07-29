"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion";

/**
 * Full-viewport decorative path that draws as the user scrolls.
 * Weaves across the screen (not stuck to one edge).
 */
const PATH_D =
  "M 4 2 C 18 8, 28 14, 42 10 C 58 5, 72 12, 88 18 C 96 22, 94 32, 82 38 C 68 46, 48 42, 32 48 C 16 54, 8 62, 14 72 C 22 84, 48 78, 66 86 C 78 92, 88 96, 96 98";

export function ScrollPath(): ReactNode {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement | null>(null);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });
  const pathLength = useTransform(smooth, [0, 1], [0, 1]);
  const glowX = useSpring(4, { stiffness: 120, damping: 28 });
  const glowY = useSpring(2, { stiffness: 120, damping: 28 });
  const left = useTransform(glowX, (x) => `${x}%`);
  const top = useTransform(glowY, (y) => `${y}%`);

  useMotionValueEvent(smooth, "change", (v) => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    if (!len) return;
    const pt = el.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    glowX.set(pt.x);
    glowY.set(pt.y);
  });

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden overflow-hidden md:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={PATH_D}
          className="stroke-foreground/[0.07] dark:stroke-foreground/[0.12]"
          strokeWidth="0.35"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          ref={pathRef}
          d={PATH_D}
          className="stroke-foreground/35 dark:stroke-foreground/45"
          strokeWidth="0.45"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
        <motion.path
          d={PATH_D}
          className="stroke-[color-mix(in_srgb,var(--ring)_50%,transparent)]"
          strokeWidth="0.22"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
          opacity={0.75}
        />
      </svg>

      <motion.div
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left,
          top,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--ring) 90%, white) 0%, transparent 70%)",
          boxShadow:
            "0 0 18px 4px color-mix(in srgb, var(--ring) 45%, transparent)",
        }}
      />
    </div>
  );
}
