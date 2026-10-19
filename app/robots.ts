import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  const live = process.env.SITE_INDEXABLE === "true" && Boolean(site.domain);
  return {
    rules: {
      userAgent: "*",
      ...(live ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    ...(live ? { sitemap: `${site.domain}/sitemap.xml` } : {}),
  };
}
