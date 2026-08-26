import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, INDEXABLE_SLUGS } from "@/app/data/projects";
import { SITE_URL } from "@/app/lib/site";
import CaseStudyClient from "./CaseStudyClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  const description = project.description.split("\n\n")[0];
  const isIndexable = INDEXABLE_SLUGS.includes(project.slug);

  return {
    title: project.title,
    description,
    alternates: { canonical: `${SITE_URL}/work/${project.slug}` },
    robots: isIndexable ? undefined : { index: false, follow: false },
    openGraph: {
      title: project.title,
      description,
      url: `/work/${project.slug}`,
      type: "article",
      images: project.images[0] ? [{ url: project.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.images[0] ? [project.images[0]] : undefined,
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const isIndexable = INDEXABLE_SLUGS.includes(project.slug);

  return (
    <>
      {isIndexable && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.title,
              description: project.description.split("\n\n")[0],
              url: `${SITE_URL}/work/${project.slug}`,
              image: project.images[0] ? `${SITE_URL}${project.images[0]}` : undefined,
              creator: { "@type": "Person", name: "Jay Vyas" },
              datePublished: project.year,
            }),
          }}
        />
      )}
      <CaseStudyClient slug={params.slug} />
    </>
  );
}
