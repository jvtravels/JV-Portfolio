"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { PROJECTS, type Project } from "@/app/data/projects";

function ImageCarousel({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (width > 0) x.set(-(active * width));
  }, [width]);

  const snapTo = (i: number) => {
    const idx = Math.max(0, Math.min(images.length - 1, i));
    setActive(idx);
    animate(x, -(idx * width), { type: "spring", stiffness: 320, damping: 38, mass: 0.9 });
  };

  return (
    <div>
      <div ref={containerRef} data-drag="true" style={{ overflow: "visible", cursor: "none" }}>
        {width > 0 && (
          <motion.div
            style={{ x, display: "flex", willChange: "transform" }}
            drag="x"
            dragConstraints={{ left: -(images.length - 1) * width, right: 0 }}
            dragElastic={0.08}
            whileDrag={{ cursor: "none" }}
            onDragEnd={(_, info) => {
              if (info.velocity.x < -200 || info.offset.x < -(width * 0.12)) snapTo(active + 1);
              else if (info.velocity.x > 200 || info.offset.x > width * 0.12) snapTo(active - 1);
              else snapTo(active);
            }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 ${width}px`,
                  width,
                  borderRadius: 6,
                  overflow: "hidden",
                  opacity: i === active ? 1 : 0.2,
                  transition: "opacity 0.4s ease",
                }}
              >
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  style={{
                    width: "100%",
                    aspectRatio: "1.8 / 1",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="reveal" style={{ marginBottom: 120 }}>
      <Link href={`/work/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <ImageCarousel images={project.images} />
      </Link>

      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.5fr 160px",
        gap: "0 40px",
        paddingTop: 28,
      }}>
        {/* Title + tags */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Link href={`/work/${project.slug}`} style={{ textDecoration: "none" }}>
            <h2 style={{
              fontSize: 19,
              fontWeight: 400,
              lineHeight: 1.38,
              letterSpacing: "-0.2px",
              color: "#fff",
              margin: 0,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
            >
              {project.title}
            </h2>
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 3,
                padding: "3px 8px",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          {project.description.split("\n\n").map((para, j) => (
            <p key={j} style={{
              fontSize: 13,
              fontWeight: 400,
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.72,
              letterSpacing: "-0.01em",
              margin: j > 0 ? "10px 0 0" : 0,
            }}>
              {para}
            </p>
          ))}
        </div>

        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <div style={{
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
              marginBottom: 6,
            }}>
              Industry
            </div>
            <div style={{
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.75)",
            }}>
              {project.industry}
            </div>
          </div>
          <div>
            <div style={{
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
              marginBottom: 6,
            }}>
              Live Site
            </div>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="work-link" style={{
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}>
              {project.liveSite}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" style={{ padding: "40px 160px 0", borderTop: "1px solid rgba(255,255,255,0.07)", boxSizing: "border-box", overflow: "hidden" }}>
      {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} />)}
      {/* Load more */}
      <div style={{ paddingBottom: 80, paddingTop: 0 }}>
        <button style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.14)",
          background: "none",
          padding: "12px 24px",
          borderRadius: 2,
          cursor: "pointer",
          transition: "color 0.2s ease, border-color 0.2s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.9)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; }}
        >
          Load more works
        </button>
      </div>
    </section>
  );
}
