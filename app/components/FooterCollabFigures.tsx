"use client";

import { useEffect, useRef } from "react";

// The heading's font-size scales with container width (cqw) and the figures'
// own size scales with viewport width (vw) — they don't grow in lockstep at
// every breakpoint (clamp caps engage at different widths for each), so a
// static right:% offset for the man/fox only lines up at the one viewport
// width it was tuned against. Measuring the actual rendered letter positions
// at runtime and pinning the figures to them is the only way this holds at
// every width.
export default function FooterCollabFigures() {
  const figuresRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const manRef = useRef<HTMLImageElement>(null);
  const foxRef = useRef<HTMLImageElement>(null);
  const manShadowRef = useRef<HTMLDivElement>(null);
  const foxShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const align = () => {
      const figures = figuresRef.current;
      const heading = headingRef.current;
      const man = manRef.current;
      const fox = foxRef.current;
      const manShadow = manShadowRef.current;
      const foxShadow = foxShadowRef.current;
      const textNode = heading?.firstChild;
      if (!figures || !heading || !man || !fox || !manShadow || !foxShadow || !textNode) return;

      const getCharRect = (index: number) => {
        const range = document.createRange();
        range.setStart(textNode, index);
        range.setEnd(textNode, index + 1);
        return range.getBoundingClientRect();
      };

      const figuresLeft = figures.getBoundingClientRect().left;
      const aRect = getCharRect(10); // first "a" in "Collaborate"
      const bRect = getCharRect(11); // "b" right after it
      const aCenter = (aRect.left + aRect.right) / 2 - figuresLeft;
      // The fox perches near the A/B seam, not B's own center — it sits on
      // the left third of "b", right where "a" and "b" meet.
      const foxAnchor = bRect.left - figuresLeft + bRect.width * 0.28;

      man.style.left = `${aCenter - man.offsetWidth / 2}px`;
      man.style.right = "auto";
      manShadow.style.left = `${aCenter}px`;
      fox.style.left = `${foxAnchor - fox.offsetWidth / 2}px`;
      fox.style.right = "auto";
      foxShadow.style.left = `${foxAnchor}px`;
    };

    align();
    document.fonts?.ready.then(align);

    const observer = new ResizeObserver(align);
    if (figuresRef.current) observer.observe(figuresRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={figuresRef} className="reveal footer-collab-figures">
      <div ref={manShadowRef} className="footer-collab-shadow" />
      <img
        ref={manRef}
        src="/FooterMan.png"
        alt=""
        style={{ width: "clamp(64px, 5.4vw, 106px)", height: "auto", transform: "translateY(calc(-100% + 32px))" }}
      />
      <div ref={foxShadowRef} className="footer-collab-shadow footer-collab-shadow-fox" />
      <img
        ref={foxRef}
        src="/FooterDog.png"
        alt=""
        className="footer-collab-fox"
        style={{ width: "clamp(40px, 3.5vw, 70px)", height: "auto", transform: "translateY(calc(-100% + 32px))" }}
      />
      <h2 ref={headingRef} className="footer-collab-heading">Let&apos;s Collaborate</h2>
    </div>
  );
}
