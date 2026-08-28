"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import { PROJECTS, getProjectBySlug } from "@/app/data/projects";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const LineSidebar = dynamic(() => import("@/app/components/LineSidebar"), { ssr: false });

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "tldr",         label: "TL;DR" },
  { id: "preview",      label: "Preview" },
  { id: "research",     label: "User Research" },
  { id: "problem",      label: "Problem Statement" },
  { id: "process",      label: "Core Flows" },
  { id: "brand",        label: "Brand Identity" },
  { id: "impact",       label: "Impact" },
  { id: "learnings",    label: "Key Learnings" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
}

export default function CaseStudyClient({ slug }: { slug: string }) {
  const [active, setActive]     = useState("introduction");
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => { setActiveImg(0); }, [slug]);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-28% 0px -65% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, [slug]);

  const project = getProjectBySlug(slug);
  const idx     = PROJECTS.findIndex(p => p.slug === slug);

  if (!project) { notFound(); return null; }

  const prev    = idx > 0 ? PROJECTS[idx - 1] : null;
  const next    = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;
  const safeImg = Math.min(activeImg, project.images.length - 1);

  const heroTitle = project.title.includes(" — ")
    ? project.title.split(" — ")[1]
    : project.title;

  return (
    <>
      <Nav />

      <style dangerouslySetInnerHTML={{ __html: `
        .cs * { box-sizing: border-box; }
        .cs { background: var(--bg); min-height: 100vh; padding-top: 72px; font-family: var(--font); color: var(--text); }

        /* Layout — matches home page --page-px margins */
        .cs-wrap { display: grid; grid-template-columns: 220px 1fr; padding: 0 var(--page-px); }

        /* Sidebar */
        .cs-aside { padding: 44px 0 60px; border-right: 1px solid rgba(var(--fg-rgb),0.07); }
        .cs-aside-inner { position: sticky; top: 96px; }
        .cs-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(var(--fg-rgb),0.32); text-decoration: none; margin-bottom: 36px; transition: color .2s; }
        .cs-back:hover { color: rgba(var(--fg-rgb),0.65); }
        .cs-aside .line-sidebar__text { font-family: var(--font); }
        .cs-aside .line-sidebar__item[aria-current='true'] .line-sidebar__text { font-weight: 600; }

        /* Main */
        .cs-main { padding: 44px 0 88px 60px; }
        .cs-section { margin-bottom: 88px; scroll-margin-top: 96px; }
        .cs-narrow { max-width: 640px; }

        /* Hero */
        .cs-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(var(--fg-rgb),0.3); margin: 0 0 16px; }
        .cs-h1 { font-size: clamp(36px, 4.2vw, 58px); font-weight: 700; letter-spacing: -0.04em; line-height: 1.06; color: rgba(var(--fg-rgb),0.95); margin: 0 0 32px; max-width: 720px; }
        .cs-hero-meta { display: flex; align-items: center; gap: 0; flex-wrap: wrap; margin-bottom: 48px; }
        .cs-tag { font-size: 11px; color: rgba(var(--fg-rgb),0.25); padding-right: 14px; font-weight: 400; }
        .cs-tag-sep { font-size: 11px; color: rgba(var(--fg-rgb),0.1); padding-right: 14px; }

        /* Hero image */
        .cs-hero-img { width: 100%; border-radius: 10px; border: 1px solid rgba(var(--fg-rgb),0.07); display: block; margin-bottom: 64px; }
        .cs-divider { border: none; border-top: 1px solid rgba(var(--fg-rgb),0.07); margin: 0 0 80px; }

        /* Section label */
        .cs-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(var(--fg-rgb),0.22); margin: 0 0 32px; }

        /* Fact table — Introduction */
        .cs-fact-table { max-width: 680px; }
        .cs-fact-row { display: grid; grid-template-columns: 160px 1fr; gap: 24px; padding: 20px 0; border-bottom: 1px solid rgba(var(--fg-rgb),0.05); }
        .cs-fact-row:first-child { border-top: 1px solid rgba(var(--fg-rgb),0.05); }
        .cs-fact-label { font-size: 12px; font-weight: 500; color: rgba(var(--fg-rgb),0.32); padding-top: 2px; line-height: 1.5; }
        .cs-fact-val { font-size: 14.5px; line-height: 1.72; color: rgba(var(--fg-rgb),0.55); margin: 0; }

        /* TL;DR */
        .cs-tldr { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cs-card { background: rgba(var(--fg-rgb),0.04); border: 1px solid rgba(var(--fg-rgb),0.07); border-radius: 10px; padding: 28px; }
        .cs-card-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(var(--fg-rgb),0.28); margin: 0 0 14px; }
        .cs-p { font-size: 15px; line-height: 1.8; color: rgba(var(--fg-rgb),0.46); margin: 0 0 14px; }
        .cs-p:last-child { margin-bottom: 0; }
        .cs-list { padding-left: 16px; margin: 12px 0 0; }
        .cs-list li { font-size: 14px; line-height: 1.72; color: rgba(var(--fg-rgb),0.42); margin-bottom: 9px; }
        .cs-list li:last-child { margin-bottom: 0; }

        /* Preview */
        .cs-img { width: 100%; border-radius: 8px; border: 1px solid rgba(var(--fg-rgb),0.07); display: block; }
        .cs-preview-caption { font-size: 13px; color: rgba(var(--fg-rgb),0.32); margin: 0 0 20px; font-style: italic; }
        .cs-thumbs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
        .cs-thumb { width: 72px; height: 48px; border-radius: 5px; overflow: hidden; border: 2px solid transparent; padding: 0; background: none; opacity: .3; transition: opacity .2s, border-color .2s; }
        .cs-thumb:hover { opacity: .6; }
        .cs-thumb.on { border-color: rgba(var(--fg-rgb),0.5); opacity: 1; }
        .cs-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* User Research */
        .cs-research-intro { font-size: 15px; line-height: 1.8; color: rgba(var(--fg-rgb),0.46); margin: 0 0 36px; max-width: 640px; }
        .cs-user-groups { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 40px; }
        .cs-user-group { background: rgba(var(--fg-rgb),0.04); border: 1px solid rgba(var(--fg-rgb),0.07); border-radius: 10px; padding: 24px; }
        .cs-ug-num { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: rgba(var(--fg-rgb),0.2); margin: 0 0 8px; }
        .cs-ug-title { font-size: 14px; font-weight: 600; color: rgba(var(--fg-rgb),0.82); margin: 0 0 14px; }
        .cs-ug-list { list-style: none; padding: 0; margin: 0; }
        .cs-ug-list li { font-size: 13px; line-height: 1.65; color: rgba(var(--fg-rgb),0.4); margin-bottom: 7px; padding-left: 12px; position: relative; }
        .cs-ug-list li::before { content: "—"; position: absolute; left: 0; color: rgba(var(--fg-rgb),0.2); font-size: 10px; top: 3px; }

        /* Problem Statement */
        .cs-blockquote { border-left: 2px solid var(--accent); padding: 4px 0 4px 20px; margin: 0 0 28px; }
        .cs-blockquote p { font-size: 18px; font-weight: 400; line-height: 1.6; color: rgba(var(--fg-rgb),0.65); margin: 0; font-style: italic; }

        /* Core Flows — label/value rows */
        .cs-flow-row { display: grid; grid-template-columns: 160px 1fr; gap: 24px; padding: 20px 0; border-bottom: 1px solid rgba(var(--fg-rgb),0.05); max-width: 680px; margin-bottom: 24px; }
        .cs-flow-row:first-of-type { border-top: 1px solid rgba(var(--fg-rgb),0.05); }
        .cs-flow-num { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: rgba(var(--fg-rgb),0.25); padding-top: 2px; }
        .cs-img-gap { margin: 0 0 40px; }
        .cs-img-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 16px; }
        .cs-img-grid img { width: 100%; border-radius: 7px; border: 1px solid rgba(var(--fg-rgb),0.06); display: block; }

        /* Brand Identity */
        .cs-brand-note { font-size: 15px; line-height: 1.8; color: rgba(var(--fg-rgb),0.46); margin: 0 0 32px; max-width: 640px; }

        /* Impact */
        .cs-metrics { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 28px; }
        .cs-metric { background: rgba(var(--fg-rgb),0.04); border: 1px solid rgba(var(--fg-rgb),0.07); border-radius: 10px; padding: 28px; }
        .cs-metric-val { font-size: 34px; font-weight: 600; letter-spacing: -0.04em; color: rgba(var(--fg-rgb),0.92); margin: 0 0 6px; line-height: 1; }
        .cs-metric-lbl { font-size: 12px; color: rgba(var(--fg-rgb),0.36); font-weight: 400; line-height: 1.4; margin: 0; }

        /* Key Learnings */
        .cs-learnings { display: flex; flex-direction: column; gap: 12px; max-width: 680px; }
        .cs-learning { background: rgba(var(--fg-rgb),0.04); border: 1px solid rgba(var(--fg-rgb),0.07); border-radius: 10px; padding: 28px; }
        .cs-learning-num { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: rgba(var(--fg-rgb),0.18); margin: 0 0 10px; }
        .cs-learning-title { font-size: 14px; font-weight: 600; color: rgba(var(--fg-rgb),0.82); margin: 0 0 8px; }
        .cs-learning-text { font-size: 14px; line-height: 1.75; color: rgba(var(--fg-rgb),0.46); margin: 0; }

        /* Prev / Next */
        .cs-prevnext { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid rgba(var(--fg-rgb),0.07); margin-top: 48px; }
        .cs-nav-link { display: block; padding: 28px; text-decoration: none; transition: background .15s; }
        .cs-nav-link:hover { background: rgba(var(--fg-rgb),0.03); }
        .cs-nav-dir { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(var(--fg-rgb),0.2); margin: 0 0 8px; }
        .cs-nav-title { font-size: 15px; font-weight: 500; color: rgba(var(--fg-rgb),0.65); margin: 0; transition: color .15s; }
        .cs-nav-link:hover .cs-nav-title { color: rgba(var(--fg-rgb),0.9); }
        .cs-nav-right { border-left: 1px solid rgba(var(--fg-rgb),0.07); text-align: right; }

        /* Responsive */
        @media (max-width: 900px) {
          .cs-wrap { grid-template-columns: 1fr; }
          .cs-aside { display: none; }
          .cs-main { padding: 24px 20px 60px; }
          .cs-tldr, .cs-user-groups, .cs-metrics, .cs-prevnext, .cs-img-grid { grid-template-columns: 1fr; }
          .cs-fact-row, .cs-flow-row { grid-template-columns: 1fr; gap: 6px; }
          .cs-nav-right { border-left: none; border-top: 1px solid rgba(var(--fg-rgb),0.07); text-align: left; }
        }
      ` }} />

      <div className="cs">
        <div className="cs-wrap">

          {/* ── Sidebar ── */}
          <aside className="cs-aside">
            <div className="cs-aside-inner">
              <Link href="/" className="cs-back">← Back</Link>
              <LineSidebar
                items={TOC.map(t => t.label)}
                activeIndex={TOC.findIndex(t => t.id === active)}
                onItemClick={(i) => scrollTo(TOC[i].id)}
                accentColor="var(--accent)"
                textColor="var(--text-dim)"
                markerColor="var(--text-muted)"
                showIndex={false}
                showMarker
                proximityRadius={100}
                maxShift={12}
                falloff="smooth"
                markerLength={20}
                markerGap={0}
                tickScale={0.5}
                scaleTick
                itemGap={20}
                fontSize={0.875}
                smoothing={100}
              />
            </div>
          </aside>

          {/* ── Main ── */}
          <main className="cs-main">

            {/* Hero */}
            <p className="cs-eyebrow">{project.shortTitle}</p>
            <h1 className="cs-h1">{heroTitle}.</h1>
            <div className="cs-hero-meta">
              {project.tags.map((tag, i) => (
                <span key={tag}>
                  <span className="cs-tag">{tag}</span>
                  {i < project.tags.length - 1 && <span className="cs-tag-sep">·</span>}
                </span>
              ))}
              <span className="cs-tag-sep">·</span>
              <span className="cs-tag">{project.year}</span>
            </div>

            {/* Hero image */}
            <img src={project.images[0]} alt={project.shortTitle} className="cs-hero-img" />

            {/* ── 1. Introduction ── */}
            <section id="introduction" className="cs-section">
              <p className="cs-label">Introduction</p>
              <div className="cs-fact-table">
                <div className="cs-fact-row">
                  <span className="cs-fact-label">What is {project.shortTitle}?</span>
                  <p className="cs-fact-val">{project.whatIs}</p>
                </div>
                <div className="cs-fact-row">
                  <span className="cs-fact-label">My Role</span>
                  <p className="cs-fact-val">{project.role}</p>
                </div>
                <div className="cs-fact-row">
                  <span className="cs-fact-label">Timeline</span>
                  <p className="cs-fact-val">{project.timeline}</p>
                </div>
              </div>
            </section>

            <hr className="cs-divider" />

            {/* ── 2. TL;DR ── */}
            <section id="tldr" className="cs-section">
              <p className="cs-label">TL;DR</p>
              <div className="cs-tldr">
                <div className="cs-card">
                  <p className="cs-card-label">Problem</p>
                  <p className="cs-p" style={{ margin: 0 }}>{project.problem}</p>
                </div>
                <div className="cs-card">
                  <p className="cs-card-label">Solution</p>
                  <p className="cs-p">{project.solution}</p>
                  <ul className="cs-list">
                    {project.tldrDecisions.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            <hr className="cs-divider" />

            {/* ── 3. Preview ── */}
            {project.images.length > 1 && (
              <section id="preview" className="cs-section">
                <p className="cs-label">Preview</p>
                <p className="cs-preview-caption">What the work looked like</p>
                <img src={project.images[Math.max(1, safeImg)]} alt={project.shortTitle} className="cs-img" />
                {project.images.length > 2 && (
                  <div className="cs-thumbs">
                    {project.images.slice(1).map((img, i) => {
                      const ri = i + 1;
                      return (
                        <button key={ri} onClick={() => setActiveImg(ri)} className={`cs-thumb${ri === Math.max(1, safeImg) ? " on" : ""}`}>
                          <img src={img} alt="" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            <hr className="cs-divider" />

            {/* ── 4. User Research ── */}
            <section id="research" className="cs-section">
              <p className="cs-label">User Research</p>
              <p className="cs-research-intro">
                Three distinct audience groups, same core tension — the existing experience wasn't built for how they actually work.
              </p>
              <div className="cs-user-groups">
                {project.userGroups.map(g => (
                  <div key={g.num} className="cs-user-group">
                    <p className="cs-ug-num">{g.num}</p>
                    <p className="cs-ug-title">{g.title}</p>
                    <ul className="cs-ug-list">
                      {g.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <hr className="cs-divider" />

            {/* ── 5. Problem Statement ── */}
            <section id="problem" className="cs-section">
              <p className="cs-label">Problem Statement</p>
              <div className="cs-narrow">
                <div className="cs-blockquote">
                  <p>{project.hmwQuestion}</p>
                </div>
                {project.description.split("\n\n").map((para, i) => (
                  <p key={i} className="cs-p">{para}</p>
                ))}
              </div>
            </section>

            <hr className="cs-divider" />

            {/* ── 6. Core Flows ── */}
            <section id="process" className="cs-section">
              <p className="cs-label">Core Flows</p>

              <div className="cs-flow-row">
                <span className="cs-flow-num">Flow #1</span>
                <p className="cs-fact-val">{project.solution}</p>
              </div>
              {project.images[2] && (
                <div className="cs-img-gap">
                  <img src={project.images[2]} alt="" className="cs-img" />
                </div>
              )}

              {project.images[3] && (
                <>
                  <div className="cs-flow-row">
                    <span className="cs-flow-num">Flow #2</span>
                    <p className="cs-fact-val">{project.description.split("\n\n").slice(-1)[0]}</p>
                  </div>
                  <div className="cs-img-gap">
                    <img src={project.images[3]} alt="" className="cs-img" />
                  </div>
                </>
              )}

              {project.images.length > 4 && (
                <div className="cs-img-grid">
                  {project.images.slice(4).map((img, i) => <img key={i} src={img} alt="" />)}
                </div>
              )}
            </section>

            <hr className="cs-divider" />

            {/* ── 7. Brand Identity ── */}
            <section id="brand" className="cs-section">
              <p className="cs-label">Brand Identity</p>
              <p className="cs-brand-note">{project.brandNote}</p>
              {project.images[1] && (
                <img src={project.images[1]} alt="" className="cs-img" />
              )}
            </section>

            <hr className="cs-divider" />

            {/* ── 8. Impact ── */}
            <section id="impact" className="cs-section">
              <p className="cs-label">Impact</p>
              <div className="cs-metrics">
                {project.metrics.map((m, i) => (
                  <div key={i} className="cs-metric">
                    <p className="cs-metric-val">{m.value}</p>
                    <p className="cs-metric-lbl">{m.label}</p>
                  </div>
                ))}
              </div>
              <p className="cs-p cs-narrow">{project.results}</p>
            </section>

            <hr className="cs-divider" />

            {/* ── 9. Key Learnings ── */}
            <section id="learnings" className="cs-section">
              <p className="cs-label">Key Learnings</p>
              <div className="cs-learnings">
                {project.learningsList.map((text, i) => {
                  const dotIdx = text.indexOf(". ");
                  const title  = dotIdx > -1 ? text.slice(0, dotIdx) : text;
                  const body   = dotIdx > -1 ? text.slice(dotIdx + 2) : "";
                  return (
                    <div key={i} className="cs-learning">
                      <p className="cs-learning-num">{String(i + 1).padStart(2, "0")}</p>
                      <p className="cs-learning-title">{title}</p>
                      {body && <p className="cs-learning-text">{body}</p>}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Prev / Next ── */}
            <div className="cs-prevnext">
              {prev ? (
                <Link href={`/work/${prev.slug}`} className="cs-nav-link">
                  <p className="cs-nav-dir">← Previous</p>
                  <p className="cs-nav-title">{prev.shortTitle}</p>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/work/${next.slug}`} className="cs-nav-link cs-nav-right">
                  <p className="cs-nav-dir">Next →</p>
                  <p className="cs-nav-title">{next.shortTitle}</p>
                </Link>
              ) : <div />}
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
