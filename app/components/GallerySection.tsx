"use client";

import Image from "next/image";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

// Placeholder shots cycled from existing project assets — swap in real
// gallery images (moodboards, UI shots, brand work) later.
const GALLERY_IMAGES = [
  "/Work/P1.avif", "/Articles/A1.png", "/Work/Tempo-dark.png",
  "/Work/P2.avif", "/Articles/A2.png", "/Companies/T1.png",
  "/Work/P3.avif", "/Articles/A3.png", "/Work/Tempo-light.png",
  "/Work/P4.avif", "/Companies/T2.png", "/Companies/T3.png",
];

const COLUMNS: { images: string[]; range: [string, string] }[] = [
  { images: GALLERY_IMAGES.slice(0, 3), range: ["2%", "-20%"] },
  { images: GALLERY_IMAGES.slice(3, 6), range: ["-10%", "-42%"] },
  { images: GALLERY_IMAGES.slice(6, 9), range: ["4%", "-16%"] },
  { images: GALLERY_IMAGES.slice(9, 12), range: ["-6%", "-34%"] },
];

function GalleryColumn({
  images,
  progress,
  range,
}: {
  images: string[];
  progress: MotionValue<number>;
  range: [string, string];
}) {
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : range);
  return (
    <motion.div className="gallery-column" style={{ y }}>
      {images.map((src, i) => (
        <div key={i} className="gallery-item">
          <Image src={src} alt="" fill sizes="25vw" style={{ objectFit: "cover" }} />
        </div>
      ))}
    </motion.div>
  );
}

export default function GallerySection() {
  const gallery = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  return (
    <section id="gallery">
      <div className="section-py" style={{ position: "relative" }}>
        {/* Dashed frame */}
        <DashedH style={{ bottom: 0, left: 0, right: 0 }} />
        <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
        <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />

        <div className="section-px">
          <span style={{
            display: "block",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 12,
          }}>
            Gallery
          </span>
          <h2 className="reveal" style={{
            textAlign: "center",
            fontSize: "clamp(24px, 7vw, 40px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.25,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 48,
            maxWidth: 640,
          }}>
            A closer look at the work
          </h2>

          <div ref={gallery} className="reveal gallery-viewport">
            {COLUMNS.map((col, i) => (
              <GalleryColumn key={i} images={col.images} progress={scrollYProgress} range={col.range} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
