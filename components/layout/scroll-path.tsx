"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion";

/** Vertical wavy path — fixed to left edge only. */
const PATH_D =
  "M20 0 C 8 80, 32 160, 20 240 C 8 320, 32 400, 20 480 C 8 560, 32 640, 20 720 C 8 800, 32 880, 20 1000";

const FALLBACK_BY_ROUTE: Record<string, string[]> = {
  "/": ["About me", "Projects", "Let's connect"],
  "/about": ["Story", "Background", "Stack", "Let's connect"],
  "/projects": ["My work", "Let's connect"],
};

function useJourneyLabel(pathname: string): string {
  const [label, setLabel] = useState(
    () => FALLBACK_BY_ROUTE[pathname]?.[0] ?? "Exploring"
  );

  useEffect(() => {
    const defaults = FALLBACK_BY_ROUTE[pathname] ?? ["Exploring"];
    setLabel(defaults[0] ?? "Exploring");

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-journey]")
    );
    if (nodes.length === 0) return;

    const visible = new Map<Element, number>();
    const pick = (): void => {
      let best: { el: Element; ratio: number } | null = null;
      for (const [el, ratio] of visible) {
        if (!best || ratio > best.ratio) best = { el, ratio };
      }
      if (best) {
        const next = best.el.getAttribute("data-journey");
        if (next) setLabel(next);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.08) {
            visible.set(entry.target, entry.intersectionRatio);
          } else {
            visible.delete(entry.target);
          }
        }
        pick();
      },
      {
        threshold: [0.08, 0.2, 0.35, 0.5, 0.65],
        rootMargin: "-18% 0px -35% 0px",
      }
    );

    for (const n of nodes) io.observe(n);
    return () => io.disconnect();
  }, [pathname]);

  return label;
}

/** Left-rail scroll indicator with section journey label. */
export function ScrollPath(): ReactNode {
  const reduced = useReducedMotion();
  const pathname = usePathname() || "/";
  const label = useJourneyLabel(pathname);
  const uid = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement | null>(null);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });
  const pathLength = useTransform(smooth, [0, 1], [0, 1]);
  const glowY = useSpring(0, { stiffness: 100, damping: 24 });
  const top = useTransform(glowY, (y) => `${y}%`);

  useMotionValueEvent(smooth, "change", (v) => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    if (!len) return;
    const pt = el.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    glowY.set((pt.y / 1000) * 100);
  });

  if (reduced) return null;

  const gradId = `sp-l-grad-${uid}`;
  const softId = `sp-l-soft-${uid}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-2 z-40 hidden h-full w-14 md:left-3 md:block lg:left-5 lg:w-16"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id={softId} x="-100%" y="-20%" width="300%" height="140%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={PATH_D}
          className="stroke-foreground/10"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={PATH_D}
          stroke={`url(#${gradId})`}
          strokeWidth="5"
          strokeLinecap="round"
          filter={`url(#${softId})`}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
          opacity={0.35}
        />
        <motion.path
          ref={pathRef}
          d={PATH_D}
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top }}
      >
        <span className="scroll-path-pulse absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0066FF]/35" />
        <span
          className="relative block h-2.5 w-2.5 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #fff 0%, #93C5FD 40%, #0066FF 100%)",
            boxShadow:
              "0 0 10px 2px rgba(0,102,255,0.65), 0 0 22px 6px rgba(124,58,237,0.3)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-0 left-full ml-2 max-w-[9.5rem] -translate-y-1/2"
        style={{ top }}
      >
        <div className="rounded-2xl border border-foreground/10 bg-background/90 px-2.5 py-1.5 shadow-lg backdrop-blur-md dark:bg-background/80">
          <p className="text-foreground/40 text-[9px] font-medium tracking-[0.12em] uppercase">
            Now
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-foreground text-[12px] leading-tight font-semibold tracking-tight"
            >
              {label}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
