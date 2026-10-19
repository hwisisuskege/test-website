import type { MetadataRoute } from "next";
import { site, routes } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.domain || process.env.SITE_INDEXABLE !== "true") return [];
  return routes.map((path) => ({ url: `${site.domain}${path}` }));
}
