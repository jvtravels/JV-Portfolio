"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const onReveal = () => setRevealed(true);
    window.addEventListener("intro-reveal", onReveal);
    return () => window.removeEventListener("intro-reveal", onReveal);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    // Once the scale-up finishes, drop the transform entirely instead of
    // leaving it at scale(1) — an active transform keeps the heading on its
    // own compositing layer, which makes text fall back to grayscale
    // anti-aliasing and look duller than the surrounding page.
    const t = setTimeout(() => setSettled(true), 2200);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <section className="section-px hero-section" style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "var(--bg)",
    }}>
      <h1
        className={`hero-heading hero-heading-fill${revealed ? " is-filled" : ""}`}
        style={{
          position: "relative",
          fontFamily: "var(--font-gloock)",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          margin: "-120px 0 0",
          transform: settled ? undefined : revealed ? "scale(1)" : "scale(0.7)",
          // Inline `transition` fully overrides the CSS class's own
          // `transition: background-position ...` (used for the text-fill
          // wipe) rather than merging with it, so the fill's transition has
          // to be re-declared here too or it snaps instantly instead of
          // animating.
          transition: settled
            ? undefined
            : "transform 1.1s cubic-bezier(0.65, 0, 0.35, 1) 1.1s, background-position 1.1s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        Curious by Nature. Building
        <br />
        Through Design
      </h1>

      <p style={{
        position: "absolute",
        left: "50%",
        bottom: "clamp(32px, 8vh, 96px)",
        transform: "translateX(-50%)",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        lineHeight: 1.8,
        maxWidth: 460,
        opacity: revealed ? 1 : 0,
        transition: "opacity 0.7s ease 0.9s",
      }}>
        Turning questions, ideas, and complex problems into thoughtful products - from first concept to shipped experience.
      </p>
    </section>
  );
}
