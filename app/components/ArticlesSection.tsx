"use client";

import Image from "next/image";
import { ARTICLES } from "@/app/data/articles";
import { DashedH, DashedV } from "@/app/components/DashedFrame";

export default function ArticlesSection() {
  return (
    <section id="articles">
      <div className="section-py" style={{ position: "relative" }}>
        {/* Dashed frame */}
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
            Articles
          </span>
          <h2 className="reveal" style={{
            textAlign: "center",
            fontSize: "clamp(24px, 7vw, 32px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.75,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 640,
          }}>
            I like sharing my experience, knowledge with others
          </h2>

          {/* Cards */}
          <div className="articles-grid" style={{ marginBottom: 48 }}>
            {ARTICLES.map((a) => (
              <a
                key={a.slug}
                href="https://medium.com/design-bytes/the-art-of-moodboarding-724eac35d5f8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${a.title} (opens on Medium in a new tab)`}
                className="reveal articles-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                }}
                onMouseEnter={(e) => e.currentTarget.style.setProperty("--glow", "1")}
                onMouseLeave={(e) => e.currentTarget.style.setProperty("--glow", "0")}
                onFocus={(e) => e.currentTarget.style.setProperty("--glow", "1")}
                onBlur={(e) => e.currentTarget.style.setProperty("--glow", "0")}
                style={{
                  position: "relative",
                  display: "block",
                  padding: 24,
                  overflow: "hidden",
                } as React.CSSProperties}
              >
                {/* Cursor-tracked glow */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--fg-rgb),0.06), transparent 65%)",
                  opacity: "var(--glow, 0)",
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                } as React.CSSProperties} />
                {/* Cursor-tracked border highlight */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  padding: 1,
                  background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--fg-rgb),0.5), transparent 65%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  opacity: "var(--glow, 0)",
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                } as React.CSSProperties} />
                <div style={{ position: "relative", width: "100%", aspectRatio: "1387 / 780", borderRadius: 8, overflow: "hidden" }}>
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    draggable={false}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 style={{
                  fontSize: "clamp(17px, 4.5vw, 20px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  color: "var(--text)",
                  margin: "20px 0 12px",
                }}>
                  {a.title}
                </h3>
                <p style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "var(--text-muted)",
                  lineHeight: "24px",
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}>
                  {a.description}
                </p>
              </a>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="https://medium.com/design-bytes/the-art-of-moodboarding-724eac35d5f8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all articles on Medium (opens in a new tab)"
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
              <span className="btn-primary-label">View all Articles</span>
              <span className="btn-primary-fill" aria-hidden="true">
                <span className="btn-primary-label">View all Articles</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
