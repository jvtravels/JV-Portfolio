"use client";

import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/app/data/projects";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

const ITEMS = [
  { project: PROJECTS[0], size: "small" as const },
  { project: PROJECTS[1], size: "large" as const },
  { project: PROJECTS[2], size: "large" as const },
  { project: PROJECTS[3], size: "small" as const },
];

export function WorkItem({ project, size }: { project: (typeof PROJECTS)[number]; size: "small" | "large" }) {
  return (
    <div className="reveal" style={{ display: "block" }}>
      <div
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
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  transition: "opacity 0.2s ease",
                  filter: project.comingSoon ? "blur(22px)" : undefined,
                  transform: project.comingSoon ? "scale(1.1)" : undefined,
                }}
              />
              <Image
                src={project.coverLight}
                alt={project.shortTitle}
                fill
                draggable={false}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="work-cover-light"
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transition: "opacity 0.2s ease",
                  filter: project.comingSoon ? "blur(22px)" : undefined,
                  transform: project.comingSoon ? "scale(1.1)" : undefined,
                }}
              />
            </>
          ) : (
            <Image
              src={project.images[0]}
              alt={project.shortTitle}
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                filter: project.comingSoon ? "blur(22px)" : undefined,
                transform: project.comingSoon ? "scale(1.1)" : undefined,
              }}
            />
          )}
          {project.comingSoon && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.45)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 999,
                  background: "rgba(10, 10, 10, 0.92)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                Coming soon
              </span>
            </div>
          )}
        </div>
      </div>
      <h3 style={{
        fontSize: "clamp(17px, 4.5vw, 20px)",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1,
        color: "var(--text)",
        margin: "0 0 8px",
        filter: project.comingSoon ? "blur(6px)" : undefined,
        userSelect: project.comingSoon ? "none" : undefined,
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
        filter: project.comingSoon ? "blur(6px)" : undefined,
        userSelect: project.comingSoon ? "none" : undefined,
      }}>
        {project.tags.join(" + ")}
      </span>
    </div>
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
            marginBottom: 16,
          }}>
            Work
          </span>
          <h2 className="reveal section-heading" style={{
            textAlign: "center",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.75,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 640,
          }}>
            Selected work I<span style={{ fontFamily: "var(--font)" }}>&apos;</span>ve shipped for founders and teams
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

          <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <Link
              href="/work"
              aria-label="More fun stuff"
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: 48,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "0 20px",
                borderRadius: 2,
                boxSizing: "border-box",
              }}
            >
              <span className="btn-primary-label">More Fun Stuff</span>
              <span className="btn-primary-fill" aria-hidden="true">
                <span className="btn-primary-label">More Fun Stuff</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
