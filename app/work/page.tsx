import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { WorkItem } from "@/app/components/WorkSection";
import { DashedH, DashedV } from "@/app/components/DashedFrame";
import { PROJECTS } from "@/app/data/projects";
import { SITE_URL } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "All Work",
  description: "Every project Jay Vyas has shipped for founders and teams.",
  alternates: { canonical: `${SITE_URL}/work` },
  robots: { index: false, follow: true },
};

export default function AllWorkPage() {
  return (
    <>
      <Nav />
      <main id="main-content" style={{ paddingTop: 120 }}>
        <section className="section-py" style={{ position: "relative" }}>
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
              marginBottom: 16,
            }}>
              Work
            </span>
            <h1 className="section-heading" style={{
              textAlign: "center",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              lineHeight: 1.75,
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: 640,
              marginBottom: 80,
              fontFamily: "var(--font-niven)",
            }}>
              Everything I<span style={{ fontFamily: "var(--font)" }}>&apos;</span>ve shipped for founders and teams
            </h1>

            <div className="work-index-grid">
              {PROJECTS.map((project) => (
                <WorkItem key={project.slug} project={project} size="large" />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
