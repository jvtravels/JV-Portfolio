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

  // The cursor's label pill only reads data-cursor-label on mouseover, so
  // nudge it to re-read after the attribute changes on click.
  useEffect(() => {
    window.dispatchEvent(new Event("cursor-label-refresh"));
  }, [copied]);

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
      data-cursor-label={copied ? "Copied to clipboard" : "Copy Email"}
      data-cursor-no-arrow={copied ? "" : undefined}
      aria-label="Copy email address vyasjay85@gmail.com"
      className="reveal footer-collab-figures footer-collab-figures-btn"
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
    </button>
  );
}
