"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TrailItem {
  id: number;
  x: number;
  y: number;
  image: string;
}

interface CursorImageTrailProps {
  images: string[];
  itemWidth?: number;
  itemHeight?: number;
  // Minimum cursor travel (px) before the next image spawns.
  distance?: number;
  // How long an image stays fully visible before it animates out (ms).
  visibleFor?: number;
}

export default function CursorImageTrail({
  images,
  itemWidth = 150,
  itemHeight = 106,
  distance = 80,
  visibleFor = 900,
}: CursorImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const nextIndex = useRef(0);
  const nextId = useRef(0);

  useEffect(() => {
    if (images.length === 0) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        lastPos.current = null;
        return;
      }

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const last = lastPos.current;
      if (last && Math.hypot(x - last.x, y - last.y) < distance) return;
      lastPos.current = { x, y };

      const id = nextId.current++;
      const image = images[nextIndex.current % images.length];
      nextIndex.current++;

      setTrail((t) => [...t, { id, x, y, image }]);
      setTimeout(() => {
        setTrail((t) => t.filter((item) => item.id !== id));
      }, visibleFor);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [images, distance, visibleFor]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: item.x - itemWidth / 2,
              top: item.y - itemHeight / 2,
              width: itemWidth,
              height: itemHeight,
              borderRadius: 12,
              overflow: "hidden",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.28)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
