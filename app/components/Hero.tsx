"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onReveal = () => setRevealed(true);
    window.addEventListener("intro-reveal", onReveal);
    return () => window.removeEventListener("intro-reveal", onReveal);
  }, []);

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
      <h1 className="hero-heading" style={{
        position: "relative",
        fontFamily: "var(--font-gloock)",
        fontSize: "clamp(36px, 7vw, 90px)",
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: "-0.01em",
        color: "rgba(var(--fg-rgb), 0.16)",
        margin: "-60px 0 0",
      }}>
        Curious by Nature. Building
        <br />
        Through Design
        <span aria-hidden="true" className={`hero-heading-fill${revealed ? " is-filled" : ""}`}>
          Curious by Nature. Building
          <br />
          Through Design
        </span>
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
