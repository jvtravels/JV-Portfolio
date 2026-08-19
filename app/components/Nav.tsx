"use client";

import Image from "next/image";

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
      padding: "0 16px",
    }}>
      <nav style={{
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "clamp(24px, 8vw, 80px)",
        background: "rgba(var(--fg-rgb),0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 8,
        padding: "6px 20px 6px 10px",
        maxWidth: "calc(100vw - 32px)",
      }}>
        {/* Left: avatar + name */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <Image
            src="/JV.png"
            alt="Jay Vyas"
            width={34}
            height={34}
            priority
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
            color: "rgba(var(--fg-rgb),0.88)",
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
            padding: "12px 0",
            margin: "-12px 0",
            minWidth: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          onFocus={e => (e.currentTarget.style.opacity = "0.7")}
          onBlur={e => (e.currentTarget.style.opacity = "1")}
        >
          <span style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#4ade80",
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(var(--fg-rgb),0.75)",
            lineHeight: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
          }}>
            vyasjay85@gmail.com
          </span>
        </a>
      </nav>
    </div>
  );
}
