"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let activeLenis: Lenis | null = null;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    activeLenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    activeLenis = lenis;

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
      if (activeLenis === lenis) activeLenis = null;
    };
  }, []);

  return <>{children}</>;
}
