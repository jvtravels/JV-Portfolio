"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let id = 0;

    function raf(time: number) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(id);
        id = 0;
      } else if (!id) {
        id = requestAnimationFrame(raf);
      }
    };

    if (!document.hidden) id = requestAnimationFrame(raf);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
