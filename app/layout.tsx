import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { displayName, site } from "@/lib/site";
import "./globals.css";
import "./editorial.css";
const display = localFont({
  src: "../public/fonts/space-grotesk-latin.woff2",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: "../public/fonts/dm-sans-latin.woff2",
  variable: "--font-body",
  display: "swap",
});
const editorial = localFont({
  src: [
    { path: "../public/fonts/cormorant-garamond-latin.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/cormorant-garamond-italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-editorial",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: `${displayName} — From first impression to next customer`,
    template: `%s | ${displayName}`,
  },
  description:
    "Websites, social content, and digital campaigns for service businesses and ambitious startups.",
  robots: {
    index: process.env.SITE_INDEXABLE === "true" && Boolean(site.domain),
    follow: process.env.SITE_INDEXABLE === "true" && Boolean(site.domain),
  },
  ...(site.domain ? { metadataBase: new URL(site.domain) } : {}),
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema =
    site.name && site.domain
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.domain,
          ...(site.email ? { email: site.email } : {}),
          ...(site.logo
            ? { logo: new URL(site.logo, site.domain).toString() }
            : {}),
          ...(site.serviceAreas.length
            ? { areaServed: site.serviceAreas }
            : {}),
        }
      : null;
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${editorial.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        )}
      </body>
    </html>
  );
}
