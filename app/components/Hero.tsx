"use client";

export default function Hero() {
  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      minHeight: "100vh",
      paddingTop: 120,
      paddingBottom: 64,
      paddingLeft: 160,
      paddingRight: 160,
    }}>
      <h1 style={{
        fontSize: "clamp(20px, 2vw, 27px)",
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: "-0.03em",
        color: "#fff",
        maxWidth: 620,
        marginBottom: 24,
      }}>
        High-impact websites and branding for AI and tech brands. Convert more users, build trust, and turn traffic into real business results
      </h1>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <a href="mailto:vyasjay85@gmail.com" style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#fff",
          background: "#ff623b",
          padding: "11px 20px",
          borderRadius: 2,
          transition: "background 0.2s ease",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e8502c")}
          onMouseLeave={e => (e.currentTarget.style.background = "#ff623b")}
        >
          Start a project
        </a>
      </div>
    </section>
  );
}
