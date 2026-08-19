"use client";

import { useEffect, useRef, useState } from "react";

const DASH_UNIT = 8;

function dashArrayFor(length: number) {
  if (length <= 0) return "0 0";
  const period = DASH_UNIT * 2;
  const count = Math.max(1, Math.round(length / period));
  const adjustedPeriod = length / count;
  const dash = adjustedPeriod / 2;
  return `${dash} ${adjustedPeriod - dash}`;
}

export function DashedH({ style }: { style: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setLength(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "absolute", height: 1, ...style }}>
      {length > 0 && (
        <svg width="100%" height="1" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
          <line
            x1="0" y1="0.5" x2="100%" y2="0.5"
            style={{ stroke: "rgba(var(--fg-rgb), 0.16)" }}
            strokeWidth="1"
            strokeDasharray={dashArrayFor(length)}
            shapeRendering="crispEdges"
          />
        </svg>
      )}
    </div>
  );
}

export function DashedV({ style }: { style: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setLength(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "absolute", width: 1, ...style }}>
      {length > 0 && (
        <svg width="1" height="100%" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
          <line
            x1="0.5" y1="0" x2="0.5" y2="100%"
            style={{ stroke: "rgba(var(--fg-rgb), 0.16)" }}
            strokeWidth="1"
            strokeDasharray={dashArrayFor(length)}
            shapeRendering="crispEdges"
          />
        </svg>
      )}
    </div>
  );
}
