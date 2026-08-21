"use client";

export default function Hero() {
  return (
    <section className="section-px hero-section" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "var(--bg)",
    }}>
      <h1 className="reveal" style={{
        fontFamily: "var(--font-gloock)",
        fontSize: "clamp(32px, 6.4vw, 82px)",
        fontWeight: 400,
        lineHeight: 1.05,
        letterSpacing: "-0.01em",
        color: "rgba(var(--fg-rgb), 1)",
        margin: 0,
      }}>
        Curious by Nature. Building
        <br />
        Through Design
      </h1>

      <p className="reveal reveal-delay-1" style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        lineHeight: 1.8,
        maxWidth: 460,
        marginTop: 40,
      }}>
        Turning questions, ideas, and complex problems into thoughtful products - from first concept to shipped experience.
      </p>
    </section>
  );
}
