import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import WorkCaseGrid from "@/app/components/WorkCaseGrid";
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
      <Link
        href="/"
        className="work-back"
        style={{
          position: "fixed",
          top: 28,
          left: "var(--frame-inset)",
          zIndex: 150,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          color: "rgba(var(--fg-rgb),0.32)",
          textDecoration: "none",
        }}
      >
        ← Back
      </Link>
      <main id="main-content" style={{ paddingTop: 120 }}>
        <WorkCaseGrid projects={otherProjects} />
      </main>
      <Footer />
    </>
  );
}
