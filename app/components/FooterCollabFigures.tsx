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

  useEffect(() => {
    const align = () => {
      const figures = figuresRef.current;
      const heading = headingRef.current;
      const man = manRef.current;
      const fox = foxRef.current;
      const textNode = heading?.firstChild;
      if (!figures || !heading || !man || !fox || !textNode) return;

      const getCharCenterX = (index: number) => {
        const range = document.createRange();
        range.setStart(textNode, index);
        range.setEnd(textNode, index + 1);
        const rect = range.getBoundingClientRect();
        return (rect.left + rect.right) / 2;
      };

      const figuresLeft = figures.getBoundingClientRect().left;
      const aCenter = getCharCenterX(10) - figuresLeft; // first "a" in "Collaborate"
      const bCenter = getCharCenterX(11) - figuresLeft; // "b" right after it

      man.style.left = `${aCenter - man.offsetWidth / 2}px`;
      man.style.right = "auto";
      fox.style.left = `${bCenter - fox.offsetWidth / 2}px`;
      fox.style.right = "auto";
    };

    align();
    document.fonts?.ready.then(align);

    const observer = new ResizeObserver(align);
    if (figuresRef.current) observer.observe(figuresRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={figuresRef} className="reveal footer-collab-figures">
      <img
        ref={manRef}
        src="/Man.png"
        alt=""
        style={{ width: "clamp(55px, 4.6vw, 90px)", height: "auto", transform: "translateY(calc(-100% + 22px))" }}
      />
      <img
        ref={foxRef}
        src="/Fox.png"
        alt=""
        className="footer-collab-fox"
        style={{ width: "clamp(35px, 3vw, 60px)", height: "auto", transform: "translateY(calc(-100% + 14px))" }}
      />
      <h2 ref={headingRef} className="footer-collab-heading">Let&apos;s Collaborate</h2>
    </div>
  );
}
