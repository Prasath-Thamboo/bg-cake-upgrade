"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth-scroll global (Lenis). Monté une seule fois dans le layout.
 * Désactivé si l'utilisateur demande une réduction des animations.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 1.4,
    });

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    }

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
