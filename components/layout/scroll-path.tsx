"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useId, useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion";

/** Full-viewport scroll ribbon — thick, glowing, weaves across the screen. */
const PATH_D =
  "M 3 1 C 22 6, 34 11, 48 7 C 64 2, 78 9, 90 16 C 97 21, 98 30, 86 37 C 72 46, 52 41, 36 48 C 18 56, 6 64, 12 74 C 20 86, 46 80, 64 88 C 76 94, 88 97, 97 99";

export function ScrollPath(): ReactNode {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement | null>(null);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.001,
  });
  const pathLength = useTransform(smooth, [0, 1], [0, 1]);
  const glowX = useSpring(3, { stiffness: 100, damping: 24 });
  const glowY = useSpring(1, { stiffness: 100, damping: 24 });
  const left = useTransform(glowX, (x) => `${x}%`);
  const top = useTransform(glowY, (y) => `${y}%`);
  const pct = useTransform(smooth, (v) => Math.round(v * 100));

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

  const gradId = `sp-grad-${uid}`;
  const glowId = `sp-glow-${uid}`;
  const softId = `sp-soft-${uid}`;

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
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="1" />
            <stop offset="45%" stopColor="#7C3AED" stopOpacity="1" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
          </linearGradient>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={softId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
            </feMerge>
          </filter>
        </defs>

        {/* faint full track */}
        <path
          d={PATH_D}
          stroke="currentColor"
          className="text-foreground"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.06}
        />

        {/* wide soft bloom (drawn) */}
        <motion.path
          d={PATH_D}
          stroke={`url(#${gradId})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${softId})`}
          style={{ pathLength }}
          opacity={0.45}
        />

        {/* mid glow body */}
        <motion.path
          d={PATH_D}
          stroke={`url(#${gradId})`}
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          style={{ pathLength }}
          opacity={0.85}
        />

        {/* crisp core */}
        <motion.path
          ref={pathRef}
          d={PATH_D}
          stroke={`url(#${gradId})`}
          strokeWidth="0.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
          opacity={1}
        />

        {/* dashed accent on top of drawn portion feel */}
        <motion.path
          d={PATH_D}
          stroke="white"
          strokeWidth="0.2"
          strokeLinecap="round"
          strokeDasharray="0.8 1.6"
          style={{ pathLength }}
          opacity={0.35}
          className="dark:opacity-50"
        />
      </svg>

      {/* comet head */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left, top }}
      >
        {/* outer pulse ring */}
        <span className="scroll-path-pulse absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0066FF]/40" />
        {/* halo */}
        <span
          className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,102,255,0.45) 0%, rgba(124,58,237,0.2) 40%, transparent 70%)",
          }}
        />
        {/* core */}
        <span
          className="relative block h-3.5 w-3.5 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #fff 0%, #93C5FD 35%, #0066FF 75%, #7C3AED 100%)",
            boxShadow:
              "0 0 12px 3px rgba(0,102,255,0.7), 0 0 28px 8px rgba(124,58,237,0.35), 0 0 48px 14px rgba(6,182,212,0.2)",
          }}
        />
      </motion.div>

      {/* scroll % chip near comet */}
      <motion.div
        className="absolute -translate-x-1/2 rounded-full border border-white/20 bg-black/55 px-2 py-0.5 text-[10px] font-semibold tracking-tight text-white shadow-lg backdrop-blur-md dark:bg-white/10"
        style={{
          left,
          top,
          marginTop: 18,
          marginLeft: 14,
        }}
      >
        <motion.span>{pct}</motion.span>%
      </motion.div>
    </div>
  );
}
