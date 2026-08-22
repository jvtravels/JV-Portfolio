"use client";

import { useEffect, useRef, useState } from "react";

// The "Let's Collaborate" heading and the man+dog illustration are baked
// into one flattened image per theme (design-provided), so the swap between
// modes is pure CSS driven by the html[data-theme] attribute — no JS needed,
// no flash on load since that attribute is set before first paint.
export default function FooterCollabFigures() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText("vyasjay85@gmail.com");
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor-label={copied ? "Copied!" : "Copy Email"}
      aria-label="Copy email address vyasjay85@gmail.com"
      className="reveal footer-collab-figures footer-collab-figures-btn"
      style={{ position: "relative" }}
    >
      <img
        src="/FooterCollabDark.png"
        alt="Let's Collaborate"
        width={6100}
        height={1020}
        className="footer-collab-img footer-collab-img-dark"
      />
      <img
        src="/FooterCollabLight.png"
        alt="Let's Collaborate"
        width={6100}
        height={1020}
        className="footer-collab-img footer-collab-img-light"
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -44,
          left: "50%",
          transform: `translateX(-50%) translateY(${copied ? "0" : "6px"})`,
          padding: "8px 16px",
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          color: "var(--accent-text)",
          background: "var(--accent)",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.28)",
          opacity: copied ? 1 : 0,
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: "none",
        }}
      >
        Copied to clipboard
      </span>
    </button>
  );
}
