import Link from "next/link";
import { PageIntro, ClosingCTA, CTA, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Who we help",
  "Connected websites and marketing for local service businesses and technology startups, shaped around distinct customer journeys.",
  "/who-we-help",
);
const audiences = [
  {
    id: "service-businesses",
    label: "01 / Local & service businesses",
    headline: "Your expertise deserves a clearer introduction.",
    text: "When your business runs on trust, your digital presence should help people understand the work, see the fit, and get in touch without guessing.",
    challenges: [
      "Visitors cannot quickly understand your services or coverage.",
      "An outdated website undersells the quality of your work.",
      "Local search visibility is weak or business information is inconsistent.",
      "Social content is irregular and disconnected from your services.",
      "Requesting a quote or appointment takes too many steps.",
    ],
    combination: "A clearer route from local search to a useful enquiry.",
    approach:
      "Start with service and location pages, a well-structured project gallery, and a simple quote journey. Connect eligible Google Business Profile improvements and selected social content to the same story.",
    links: [
      {
        label: "Service business websites",
        href: "/services/website-design-development#category-3",
      },
      { label: "Local search", href: "/services/digital-marketing#category-2" },
      { label: "Social management", href: "/services/social-media#category-4" },
    ],
  },
  {
    id: "startups",
    label: "02 / Startups & technology companies",
    headline: "Make a complex product feel immediately relevant.",
    text: "Your audience should not need your technical knowledge to understand your product. We connect positioning, launch content, and acquisition to the next meaningful action.",
    challenges: [
      "Your product is difficult to explain in a few clear sentences.",
      "A launch is approaching without a coherent website narrative.",
      "Demo and waitlist journeys create friction or lack context.",
      "Product messaging changes from your website to social channels.",
      "You need to test acquisition ideas and understand what happens after the click.",
    ],
    combination: "One product story, from first encounter to demo.",
    approach:
      "Start with a product marketing website, focused feature pages, and a clear demo or waitlist journey. Add a launch content series and a measured campaign test when the offer, audience, and budget are ready.",
    links: [
      {
        label: "Startup websites",
        href: "/services/website-design-development#category-4",
      },
      { label: "Launch campaigns", href: "/services/social-media#category-5" },
      {
        label: "Conversion & measurement",
        href: "/services/digital-marketing#category-6",
      },
    ],
  },
];
export default function WhoWeHelp() {
  return (
    <>
      <PageIntro
        eyebrow="Who we help"
        title="Built for your next stage."
        text="Two different business worlds. One shared need: to make the value clear and the next step easy. Our approach adapts to the people you need to reach."
      />
      {audiences.map((a) => (
        <section key={a.id} id={a.id} className="audience-detail container">
          <div>
            <Eyebrow>{a.label}</Eyebrow>
            <h2>{a.headline}</h2>
            <p className="lede">{a.text}</p>
            <CTA />
          </div>
          <div>
            <h3>Sound familiar?</h3>
            <ul className="challenge-list">
              {a.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="combination">
              <span className="micro">
                AN EXAMPLE COMBINATION, NOT A FIXED PACKAGE
              </span>
              <h3>{a.combination}</h3>
              <p>{a.approach}</p>
              <div className="link-stack">
                {a.links.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label} ↗
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
      <ClosingCTA />
    </>
  );
}
