"use client";

export default function Nav() {
  return (
    <div style={{
      position: "fixed",
      top: 20,
      left: 0,
      right: 0,
      zIndex: 200,
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <nav style={{
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 80,
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 8,
        padding: "6px 20px 6px 10px",
        minWidth: 440,
      }}>
        {/* Left: avatar + name */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img
            src="/JV.png"
            alt="Jay Vyas"
            width={34}
            height={34}
            style={{
              borderRadius: 5,
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              flexShrink: 0,
            }}
          />
          <span style={{
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1,
          }}>
            Jay Vyas
          </span>
        </a>

        {/* Right: availability dot + email */}
        <a
          href="mailto:vyasjay85@gmail.com"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <span style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#4ade80",
            flexShrink: 0,
            boxShadow: "0 0 6px rgba(74,222,128,0.6)",
          }} />
          <span style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1,
          }}>
            vyasjay85@gmail.com
          </span>
        </a>
      </nav>
    </div>
  );
}
