import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import WorkCaseGrid from "@/app/components/WorkCaseGrid";
import { DashedV } from "@/app/components/DashedFrame";
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
