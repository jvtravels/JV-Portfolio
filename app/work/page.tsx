import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import BrandsSection from "@/app/components/BrandsSection";
import WorkCaseGrid from "@/app/components/WorkCaseGrid";
import { DashedH, DashedV } from "@/app/components/DashedFrame";
import { PROJECTS, HOMEPAGE_PROJECT_SLUGS } from "@/app/data/projects";
import { SITE_URL } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "All Work",
  description: "Every project Jay Vyas has shipped for founders and teams.",
  alternates: { canonical: `${SITE_URL}/work` },
  robots: { index: false, follow: true },
};

export default function AllWorkPage() {
  const otherProjects = PROJECTS.filter((p) => !HOMEPAGE_PROJECT_SLUGS.includes(p.slug));

  return (
    <>
      <Nav />
      <main id="main-content" style={{ paddingTop: 120 }}>
        {/* Header — intro + brands, mirroring the reference site's bio + client-logo strip */}
        <section className="section-py" style={{ position: "relative" }}>
          <DashedH style={{ bottom: 0, left: 0, right: 0 }} />
          <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
          <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />

          <div className="section-px">
            <span style={{
              display: "block",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 16,
            }}>
              Work
            </span>
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 500,
                fontSize: "clamp(24px, 3.2vw, 34px)",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                color: "var(--text)",
                maxWidth: 820,
                margin: 0,
              }}
            >
              Hi, I&apos;m Jay — a Senior Product Designer with 7+ years of experience across AI, SaaS, and complex digital products. I care about making complex products feel clear, coherent, and useful.
            </h1>
          </div>
        </section>

        <BrandsSection />

        {/* Work — one row per project, replicating the reference site's project-list pattern */}
        <section className="section-py" style={{ position: "relative" }}>
          <DashedV style={{ top: 0, bottom: 0, left: "var(--frame-inset)" }} />
          <DashedV style={{ top: 0, bottom: 0, right: "var(--frame-inset)" }} />

          <div className="section-px">
            <WorkCaseGrid projects={otherProjects} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
