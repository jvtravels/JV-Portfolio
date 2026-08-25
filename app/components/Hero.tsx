"use client";

import { useEffect, useState } from "react";
import CursorImageTrail from "./CursorImageTrail";

const TRAIL_IMAGES = [
  "/Work/Tempo-dark.png",
  "/Work/P1.avif",
  "/Work/P2.avif",
  "/Work/P3.avif",
  "/Work/P4.avif",
];

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [settled, setSettled] = useState(false);
  const [mobileImageIndex, setMobileImageIndex] = useState(0);

  useEffect(() => {
    const onReveal = () => setRevealed(true);
    window.addEventListener("intro-reveal", onReveal);
    return () => window.removeEventListener("intro-reveal", onReveal);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setMobileImageIndex((i) => (i + 1) % TRAIL_IMAGES.length);
    }, 1800);
    return () => clearInterval(id);
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
      <CursorImageTrail images={TRAIL_IMAGES} />

      <div className="hero-mobile-window" aria-hidden="true">
        {TRAIL_IMAGES.map((img, i) => (
          <div
            key={img}
            className="hero-mobile-window-item"
            style={{
              backgroundImage: `url(${img})`,
              opacity: i === mobileImageIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      <h1
        className={`hero-heading hero-heading-fill${revealed ? " is-filled" : ""}`}
        style={{
          position: "relative",
          zIndex: 10,
          fontFamily: "var(--font-niven)",
          fontWeight: 400,
          lineHeight: 1.75,
          padding: "0 0.2em 0.75em",
          letterSpacing: "-0.01em",
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
        <br className="hero-break" /> Through Design
      </h1>

      <p className="hero-subhead" style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        lineHeight: 1.8,
        maxWidth: 560,
        opacity: revealed ? 1 : 0,
        transition: "opacity 0.7s ease 0.9s",
      }}>
        Turning questions, ideas, and complex problems into thoughtful products - from first concept to shipped experience.
      </p>
    </section>
  );
}
