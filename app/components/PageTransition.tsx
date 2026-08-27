"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BAND_COUNT = 9;
const BAND_DURATION = 0.5;
const BAND_STAGGER = 0.045;
const SWEEP_MS = (BAND_COUNT - 1) * BAND_STAGGER * 1000 + BAND_DURATION * 1000;
const HOLD_MS = 150;

type Phase = "idle" | "closing" | "closed" | "opening";

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (reducedMotion.current) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.pathname === pathname) return;

      e.preventDefault();
      pendingHref.current = url.pathname + url.search + url.hash;
      setPhase("closing");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  useEffect(() => {
    if (phase !== "closing") return;
    const t = setTimeout(() => {
      if (pendingHref.current) router.push(pendingHref.current);
      setPhase("closed");
    }, SWEEP_MS);
    return () => clearTimeout(t);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "closed") return;
    const t = setTimeout(() => setPhase("opening"), HOLD_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "opening") return;
    const t = setTimeout(() => setPhase("idle"), SWEEP_MS + 50);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;

  const closed = phase === "closing" || phase === "closed";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: closed ? "all" : "none",
      }}
    >
      {Array.from({ length: BAND_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: closed ? 1 : 0 }}
          transition={{
            duration: BAND_DURATION,
            ease: [0.16, 1, 0.3, 1],
            delay: closed ? i * BAND_STAGGER : (BAND_COUNT - 1 - i) * BAND_STAGGER,
          }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${(i * 100) / BAND_COUNT}%`,
            height: `${100 / BAND_COUNT}%`,
            background: "var(--accent-hover)",
            transformOrigin: closed ? "top" : "bottom",
          }}
        />
      ))}
    </div>
  );
}
