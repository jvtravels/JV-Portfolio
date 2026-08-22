"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = cursorRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let visible = false;
    let rafId = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function tick() {
      cx = lerp(cx, tx, 0.14);
      cy = lerp(cy, ty, 0.14);
      if (el) el.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(tick);
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    if (!document.hidden) rafId = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        cx = tx; cy = ty;
        el.style.opacity = "1";
        visible = true;
      }
    };

    const onLeave = () => { el.style.opacity = "0"; visible = false; };
    const onEnter = () => { el.style.opacity = "1"; visible = true; };

    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";
    const TEXT = "p, h1, h2, h3, h4, h5, h6, span, li, blockquote";
    const LABEL = "[data-cursor-label]";

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      const labelEl = t.closest(LABEL) as HTMLElement | null;

      if (labelEl) {
        el.textContent = `${labelEl.getAttribute("data-cursor-label") || ""} →`;
        el.style.width = "auto";
        el.style.height = "auto";
        el.style.padding = "14px 24px";
        el.style.borderRadius = "999px";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.gap = "8px";
        el.style.whiteSpace = "nowrap";
        el.style.fontSize = "13px";
        el.style.fontWeight = "600";
        el.style.letterSpacing = "-0.01em";
        el.style.color = "var(--accent-text)";
        el.style.background = "var(--accent)";
        el.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.28)";
        el.style.mixBlendMode = "normal";
        return;
      }

      el.textContent = "";
      el.style.padding = "0";
      el.style.display = "block";
      el.style.borderRadius = "50%";
      el.style.background = "var(--cursor-color)";
      el.style.boxShadow = "none";

      const isInteractive = t.closest(INTERACTIVE);
      const isText = t.closest(TEXT);

      if (isInteractive) {
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.mixBlendMode = "difference";
      } else if (isText) {
        el.style.width = "18px";
        el.style.height = "18px";
        el.style.mixBlendMode = "difference";
      } else {
        el.style.width = "18px";
        el.style.height = "18px";
        el.style.mixBlendMode = "normal";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2147483647,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 0.2s ease, width 0.2s ease, height 0.2s ease, padding 0.2s ease, border-radius 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
        width: 18,
        height: 18,
        justifyContent: "center",
        borderRadius: "50%",
        background: "var(--cursor-color)",
      }}
    />,
    document.body
  );
}
