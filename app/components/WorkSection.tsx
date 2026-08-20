"use client";

import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/app/data/projects";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

const ITEMS = [
  { project: PROJECTS[0], size: "small" as const },
  { project: PROJECTS[1], size: "large" as const },
  { project: PROJECTS[2], size: "large" as const },
  { project: PROJECTS[3], size: "small" as const },
];

function WorkItem({ project, size }: { project: (typeof PROJECTS)[number]; size: "small" | "large" }) {
  const trackCursor = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      className="reveal"
      style={{ display: "block", textDecoration: "none" }}
      onFocus={(e) => e.currentTarget.style.setProperty("--reveal", "1")}
      onBlur={(e) => e.currentTarget.style.setProperty("--reveal", "0")}
    >
      <div
        onMouseEnter={(e) => { trackCursor(e); e.currentTarget.style.setProperty("--reveal", "1"); }}
        onMouseMove={trackCursor}
        onMouseLeave={(e) => e.currentTarget.style.setProperty("--reveal", "0")}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 8,
          marginBottom: 24,
        } as React.CSSProperties}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: size === "large" ? "16 / 11" : "16 / 13" }}>
          {project.coverDark && project.coverLight ? (
            <>
              <Image
                src={project.coverDark}
                alt={project.shortTitle}
                fill
                draggable={false}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="work-cover-dark"
                style={{ objectFit: "cover", transition: "opacity 0.2s ease" }}
              />
              <Image
                src={project.coverLight}
                alt={project.shortTitle}
                fill
                draggable={false}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="work-cover-light"
                style={{ objectFit: "cover", position: "absolute", top: 0, left: 0, transition: "opacity 0.2s ease" }}
              />
            </>
          ) : (
            <Image
              src={project.images[0]}
              alt={project.shortTitle}
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        {/* Cursor-follow arrow badge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(calc(var(--cx, 50%) - 44px), calc(var(--cy, 50%) - 44px)) scale(var(--reveal, 0))",
            opacity: "var(--reveal, 0)",
            transition: "opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
          } as React.CSSProperties}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <h3 style={{
        fontSize: "clamp(17px, 4.5vw, 20px)",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1.35,
        color: "var(--text)",
        margin: "0 0 8px",
      }}>
        {project.title}
      </h3>
      <span style={{
        display: "block",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
      }}>
        {project.tags.join(" + ")}
      </span>
    </Link>
  );
}

export default function WorkSection() {
  return (
    <section id="work">
      <div className="section-py" style={{ position: "relative" }}>
        <DashedH style={{ bottom: 0, left: 0, right: 0 }} />
        <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
        <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />

        <div className="section-px">
          {/* Eyebrow + heading */}
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
            Work
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
            maxWidth: 640,
          }}>
            Selected work I&apos;ve shipped for founders and teams
          </h2>

          {/* Row 1 — small + large */}
          <div className="work-row work-row-a">
            <WorkItem project={ITEMS[0].project} size={ITEMS[0].size} />
            <WorkItem project={ITEMS[1].project} size={ITEMS[1].size} />
          </div>

          {/* Row 2 — large + small */}
          <div className="work-row work-row-b">
            <WorkItem project={ITEMS[2].project} size={ITEMS[2].size} />
            <WorkItem project={ITEMS[3].project} size={ITEMS[3].size} />
          </div>
        </div>
      </div>
    </section>
  );
}
