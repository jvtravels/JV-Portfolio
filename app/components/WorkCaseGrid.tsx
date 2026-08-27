"use client";

import Image from "next/image";
import { PROJECTS } from "@/app/data/projects";

type Project = (typeof PROJECTS)[number];

function CaseImage({
  src,
  aspectRatio,
  blur,
}: {
  src: string;
  aspectRatio: string;
  blur?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        draggable={false}
        sizes="(max-width: 768px) 100vw, 60vw"
        style={{
          objectFit: "cover",
          objectPosition: "top",
          filter: blur ? "blur(22px)" : undefined,
          transform: blur ? "scale(1.1)" : undefined,
        }}
      />
    </div>
  );
}

function WorkCaseRow({ project, first }: { project: Project; first: boolean }) {
  const hasThemeCover = Boolean(project.coverDark && project.coverLight);
  const filmstrip = hasThemeCover ? [] : project.images.slice(2);
  const hasDescription = !project.description.startsWith("Placeholder");

  return (
    <div
      className="work-case-row"
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: 40,
        marginTop: first ? 40 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(22px, 3.4vw, 30px)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: 0,
            filter: project.comingSoon ? "blur(6px)" : undefined,
            userSelect: project.comingSoon ? "none" : undefined,
          }}
        >
          {project.title}
        </h2>
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {project.year}
        </span>
      </div>

      <div className={`work-case-hero${hasThemeCover ? " single" : ""}`}>
        {hasThemeCover ? (
          <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
            <Image
              src={project.coverDark!}
              alt=""
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="work-cover-dark"
              style={{ objectFit: "cover", objectPosition: "top", borderRadius: 8, transition: "opacity 0.2s ease" }}
            />
            <Image
              src={project.coverLight!}
              alt=""
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="work-cover-light"
              style={{ objectFit: "cover", objectPosition: "top", borderRadius: 8, position: "absolute", top: 0, left: 0, transition: "opacity 0.2s ease" }}
            />
          </div>
        ) : (
          <>
            <CaseImage src={project.images[0]} aspectRatio="16 / 10" blur={project.comingSoon} />
            {project.images[1] && (
              <CaseImage src={project.images[1]} aspectRatio="4 / 5" blur={project.comingSoon} />
            )}
          </>
        )}
      </div>

      {filmstrip.length > 0 && (
        <div className="work-case-filmstrip">
          {filmstrip.map((src, i) => (
            <div key={i} className="work-case-filmstrip-item">
              <CaseImage src={src} aspectRatio="1 / 1" blur={project.comingSoon} />
            </div>
          ))}
        </div>
      )}

      {project.comingSoon ? (
        <div style={{ marginTop: 24 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text)",
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid var(--border)",
            }}
          >
            Coming soon
          </span>
        </div>
      ) : (
        <>
          <div className="work-case-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="work-case-tag">
                {tag}
              </span>
            ))}
          </div>
          {hasDescription && <p className="work-case-desc">{project.description}</p>}
        </>
      )}
    </div>
  );
}

export default function WorkCaseGrid({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((project, i) => (
        <WorkCaseRow key={project.slug} project={project} first={i === 0} />
      ))}
    </div>
  );
}
