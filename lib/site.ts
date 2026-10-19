/** All unverified business details stay empty. FIRST/NEXT is the creative concept mark, not a claimed business name. */
export const site = {
  name: "",
  domain: "", // Canonical HTTPS origin, without a trailing slash.
  location: "",
  serviceAreas: [] as string[],
  email: "",
  logo: "", // Public asset path, e.g. /brand/logo.svg.
  socialImage: "", // Public asset path, e.g. /brand/share.jpg.
  currency: "", // Set an ISO currency before adding budget ranges.
  budgetRanges: [] as string[],
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Who we help", href: "/who-we-help" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
  ],
  cta: "Tell us what you’re building",
  businessTypes: [
    "Local or service business",
    "Startup or technology company",
    "Something else",
  ],
  timingOptions: [
    "As soon as practical",
    "In the next 1–3 months",
    "Later this year",
    "Flexible",
  ],
};
export const displayName = site.name || "FIRST/NEXT";
export const routes = [
  "/",
  "/services",
  "/services/website-design-development",
  "/services/social-media",
  "/services/digital-marketing",
  "/who-we-help",
  "/work",
  "/about",
  "/start-a-project",
];
