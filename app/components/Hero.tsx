"use client";

export default function Hero() {
  return (
    <section className="section-px hero-section" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "#000",
    }}>
      <h1 className="reveal" style={{
        fontFamily: "var(--font-gloock)",
        fontSize: "clamp(40px, 7vw, 108px)",
        fontWeight: 400,
        lineHeight: 1.05,
        letterSpacing: "-0.01em",
        color: "#fff",
        margin: 0,
      }}>
        Intelligent by Design
      </h1>

      <p className="reveal reveal-delay-1" style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.45)",
        lineHeight: 1.8,
        maxWidth: 460,
        marginTop: 40,
      }}>
        Living for curiosity, designing for the world and passionate about the design and mechanics of everyday things.
      </p>
    </section>
  );
}
