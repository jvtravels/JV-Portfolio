import type { MetadataRoute } from "next";
import { PROJECTS, INDEXABLE_SLUGS } from "@/app/data/projects";
import { SITE_URL } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...PROJECTS.filter((p) => INDEXABLE_SLUGS.includes(p.slug)).map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
