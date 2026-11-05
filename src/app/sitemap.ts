import type { MetadataRoute } from "next";
import { legalPaths } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-26");
  const legalUpdated = new Date("2026-11-02");

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/mpesa"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/sgr"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(legalPaths.support),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl(legalPaths.privacy),
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl(legalPaths.terms),
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl(legalPaths.cookies),
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl(legalPaths.refunds),
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl(legalPaths.licenses),
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl(legalPaths.delete),
      lastModified: new Date("2026-10-28"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/llms.txt"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/llms-full.txt"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
