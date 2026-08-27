"use client";

import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/app/data/projects";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

type Project = (typeof PROJECTS)[number];

function CaseImage({
  src,
  aspectRatio,
  className,
  blur,
}: {
  src: string;
  aspectRatio?: string;
  className?: string;
  blur?: boolean;
}) {
  const isVideo = src.endsWith(".mp4");

  return (
    <div
      className={className}
      style={
        className
          ? undefined
          : {
              position: "relative",
              width: "100%",
              aspectRatio,
              borderRadius: 8,
              overflow: "hidden",
              background: "var(--surface)",
            }
      }
    >
      {isVideo ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            filter: blur ? "blur(22px)" : undefined,
            transform: blur ? "scale(1.1)" : undefined,
          }}
        />
      ) : (
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
      )}
    </div>
  );
}

const FEATURE_GRID_VARIANTS = ["v1", "v2", "v3", "v4"] as const;

function FeatureGrid({ images, variant }: { images: string[]; variant: (typeof FEATURE_GRID_VARIANTS)[number] }) {
  const areas = ["a", "b", "c", "d", "e"];
  return (
    <div className={`work-case-feature-grid work-case-feature-grid--${variant}`}>
      {images.map((src, i) => (
        <div key={i} className="work-case-feature-cell" style={{ gridArea: areas[i] }}>
          <Image
            src={src}
            alt=""
            fill
            draggable={false}
            sizes="(max-width: 768px) 100vw, 40vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      ))}
    </div>
  );
}

function WorkCaseRow({ project, index }: { project: Project; index: number }) {
  const hasThemeCover = Boolean(project.coverDark && project.coverLight);
  const filmstrip = hasThemeCover ? [] : project.images.slice(2);
  const useFeatureGrid = filmstrip.length >= 4;
  const variant = FEATURE_GRID_VARIANTS[index % FEATURE_GRID_VARIANTS.length];
  const hasDescription = !project.description.startsWith("Placeholder");

  const cardContent = (
    <>
        <div className="work-case-header">
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

          {!project.comingSoon && (
            <div className="work-case-tags work-case-tags--header">
              {project.tags.map((tag) => (
                <span key={tag} className="work-case-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="work-case-media">
          <div className={`work-case-hero${hasThemeCover ? " single" : ""}`}>
            {hasThemeCover ? (
              <div className="work-case-hero-media">
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
                <CaseImage src={project.images[0]} className="work-case-hero-media" blur={project.comingSoon} />
                {project.images[1] && (
                  <CaseImage
                    src={project.images[1]}
                    className="work-case-hero-media work-case-hero-media--secondary"
                    blur={project.comingSoon}
                  />
                )}
              </>
            )}
          </div>

          {useFeatureGrid ? (
            <FeatureGrid images={filmstrip.slice(0, variant === "v4" ? 4 : 5)} variant={variant} />
          ) : (
            filmstrip.length > 0 && (
              <div className="work-case-filmstrip">
                {filmstrip.map((src, i) => (
                  <div key={i} className="work-case-filmstrip-item">
                    <CaseImage src={src} aspectRatio="1 / 1" blur={project.comingSoon} />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
    </>
  );

  return (
    <div className="work-case-row reveal">
      {project.comingSoon ? (
        cardContent
      ) : (
        <Link href={`/work/${project.slug}`} className="work-case-link">
          {cardContent}
        </Link>
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
        hasDescription && <p className="work-case-desc">{project.description}</p>
      )}
    </div>
  );
}

export default function WorkCaseGrid({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.map((project, i) => (
        <section key={project.slug} className="section-py" style={{ position: "relative" }}>
          {i === 0 && <DashedH style={{ top: 0, left: 0, right: 0 }} />}
          <DashedH style={{ bottom: 0, left: 0, right: 0 }} />
          <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
          <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />
          <div className="section-px">
            <WorkCaseRow project={project} index={i} />
          </div>
        </section>
      ))}
    </>
  );
}
