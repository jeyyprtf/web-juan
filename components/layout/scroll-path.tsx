"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import { useReducedMotion } from "@/lib/motion";

const PATH_D =
  "M 3 1 C 22 6, 34 11, 48 7 C 64 2, 78 9, 90 16 C 97 21, 98 30, 86 37 C 72 46, 52 41, 36 48 C 18 56, 6 64, 12 74 C 20 86, 46 80, 64 88 C 76 94, 88 97, 97 99";

/** Section labels per route — driven by [data-journey] on the page. */
const FALLBACK_BY_ROUTE: Record<string, string[]> = {
  "/": ["About me", "Projects", "Let's connect"],
  "/about": ["Story", "Background", "Stack", "Let's connect"],
  "/projects": ["My work", "Let's connect"],
};

type DepthMode = "behind" | "front";

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
        threshold: [0.08, 0.2, 0.35, 0.5, 0.65, 0.8],
        rootMargin: "-18% 0px -35% 0px",
      }
    );

    for (const n of nodes) io.observe(n);
    return () => io.disconnect();
  }, [pathname]);

  return label;
}

function PathSvg({
  pathRef,
  pathLength,
  uid,
  intensity = 1,
}: {
  pathRef?: RefObject<SVGPathElement | null>;
  pathLength: MotionValue<number>;
  uid: string;
  intensity?: number;
}): ReactNode {
  const gradId = `sp-grad-${uid}`;
  const glowId = `sp-glow-${uid}`;
  const softId = `sp-soft-${uid}`;

  return (
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

      <path
        d={PATH_D}
        stroke="currentColor"
        className="text-foreground"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.05 * intensity}
      />
      <motion.path
        d={PATH_D}
        stroke={`url(#${gradId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${softId})`}
        style={{ pathLength }}
        opacity={0.4 * intensity}
      />
      <motion.path
        d={PATH_D}
        stroke={`url(#${gradId})`}
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
        style={{ pathLength }}
        opacity={0.8 * intensity}
      />
      <motion.path
        ref={pathRef}
        d={PATH_D}
        stroke={`url(#${gradId})`}
        strokeWidth="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength }}
        opacity={intensity}
      />
      <motion.path
        d={PATH_D}
        stroke="white"
        strokeWidth="0.2"
        strokeLinecap="round"
        strokeDasharray="0.8 1.6"
        style={{ pathLength }}
        opacity={0.3 * intensity}
      />
    </svg>
  );
}

/**
 * Dual-depth scroll ribbon: sits behind content, then rises in front,
 * then drops behind again — feels like it weaves through the page.
 * Chip shows active journey section (not raw %).
 */
export function ScrollPath(): ReactNode {
  const reduced = useReducedMotion();
  const pathname = usePathname() || "/";
  const label = useJourneyLabel(pathname);
  const uid = useId().replace(/:/g, "");
  const pathRef = useRef<SVGPathElement | null>(null);
  const [depth, setDepth] = useState<DepthMode>("behind");

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

  // z weaves: behind → front → behind → front
  const zIndex = useTransform(
    smooth,
    [0, 0.18, 0.32, 0.48, 0.62, 0.78, 0.9, 1],
    [4, 4, 28, 28, 4, 4, 28, 28]
  );
  const frontOpacity = useTransform(
    smooth,
    [0, 0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88, 1],
    [0.15, 0.2, 1, 1, 0.2, 0.15, 1, 1, 0.25, 0.35]
  );
  const backOpacity = useTransform(
    smooth,
    [0, 0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88, 1],
    [1, 1, 0.35, 0.3, 1, 1, 0.35, 0.3, 1, 1]
  );

  useMotionValueEvent(smooth, "change", (v) => {
    const el = pathRef.current;
    if (el) {
      const len = el.getTotalLength();
      if (len) {
        const pt = el.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
        glowX.set(pt.x);
        glowY.set(pt.y);
      }
    }
    // depth bands aligned with z weave
    const front =
      (v > 0.22 && v < 0.42) || (v > 0.62 && v < 0.82) || v > 0.92;
    setDepth(front ? "front" : "behind");
  });

  if (reduced) return null;

  const head = (
    <>
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left, top }}
      >
        <span className="scroll-path-pulse absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0066FF]/40" />
        <span
          className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,102,255,0.45) 0%, rgba(124,58,237,0.2) 40%, transparent 70%)",
          }}
        />
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

      <motion.div
        className="absolute -translate-x-1/2 max-w-[11rem]"
        style={{ left, top, marginTop: 20, marginLeft: 16 }}
      >
        <div className="rounded-2xl border border-white/20 bg-black/60 px-2.5 py-1.5 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-white/10">
          <p className="text-[9px] font-medium tracking-[0.14em] text-white/50 uppercase">
            {depth === "front" ? "Over UI" : "Under UI"}
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className="text-[12px] leading-tight font-semibold tracking-tight text-white"
            >
              {label}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      {/* BACK layer — always under page content */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[3] hidden overflow-hidden md:block"
        style={{ opacity: backOpacity }}
      >
        <PathSvg pathLength={pathLength} uid={`${uid}-b`} intensity={0.85} />
      </motion.div>

      {/* FRONT layer — rises above content in weave bands */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hidden overflow-hidden md:block"
        style={{ zIndex, opacity: frontOpacity }}
      >
        <PathSvg
          pathRef={pathRef}
          pathLength={pathLength}
          uid={`${uid}-f`}
          intensity={1}
        />
        {head}
      </motion.div>
    </>
  );
}
