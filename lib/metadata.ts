import type { Metadata } from "next";
import { displayName, site } from "./site";
export function pageMetadata(
  title: string,
  description: string,
  path = "/",
): Metadata {
  return {
    title,
    description,
    alternates: site.domain
      ? { canonical: `${site.domain}${path}` }
      : undefined,
    openGraph: {
      title: `${title} | ${displayName}`,
      description,
      type: "website",
      ...(site.domain ? { url: `${site.domain}${path}` } : {}),
      ...(site.socialImage && site.domain
        ? {
            images: [
              {
                url: new URL(site.socialImage, site.domain).toString(),
                alt: displayName,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: site.socialImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(site.socialImage && site.domain
        ? { images: [new URL(site.socialImage, site.domain).toString()] }
        : {}),
    },
  };
}
