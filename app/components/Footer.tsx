"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#f0f0f0", color: "#1a1a1a" }}>
      {/* Main CTA */}
      <div style={{
        padding: "80px 80px 64px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Display heading */}
        <a
          href="mailto:vyasjay85@gmail.com"
          style={{ textDecoration: "none", display: "block" }}
        >
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(72px, 11vw, 168px)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#1a1a1a",
            margin: 0,
          }}>
            Work with{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>me.</em>
          </h2>
        </a>

        {/* Social links — centered */}
        <div style={{
          display: "flex",
          gap: 32,
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
        }}>
          {[
            { label: "Email", href: "mailto:vyasjay85@gmail.com", accent: false },
            { label: "LinkedIn", href: "https://linkedin.com", accent: false },
            { label: "@vyasjay85", href: "https://twitter.com/vyasjay85", accent: true },
          ].map(({ label, href, accent }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                fontSize: 15,
                color: accent ? "#3b3bd4" : "rgba(0,0,0,0.45)",
                textDecoration: "none",
                transition: "opacity 0.15s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 80px",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}>
        <span style={{ fontSize: 12, color: "rgba(0,0,0,0.32)", letterSpacing: "0.04em" }}>
          © Jay Vyas 2026. All rights reserved.
        </span>
        <a
          href="#"
          style={{ fontSize: 12, color: "rgba(0,0,0,0.32)", letterSpacing: "0.04em", textDecoration: "none", transition: "color 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(0,0,0,0.65)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,0,0,0.32)")}
        >
          Design & Development by Jay
        </a>
      </div>
    </footer>
  );
}
