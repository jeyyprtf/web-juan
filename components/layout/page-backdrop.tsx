"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

const ShaderFlow = dynamic(
  () => import("../shaders/shader-flow").then((m) => m.ShaderFlow),
  { ssr: false }
);

export function PageBackdrop(): ReactNode {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => setMount(true), {
        timeout: 2000,
      });
    } else {
      timeoutId = setTimeout(() => setMount(true), 1500);
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50 md:opacity-100 shader-delayed">
        {mount ? <ShaderFlow brightness={3} iterations={10} flowSpeed={[0, 0.1]} /> : null}
      </div>
    </div>
  );
}
