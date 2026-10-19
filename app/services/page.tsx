import Link from "next/link";
import { PageIntro, ClosingCTA } from "@/components/ui";
import { services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Services",
  "Website design and development, social media, and digital marketing: three connected disciplines scoped around your business.",
  "/services",
);
export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="Our services / Connected by design"
        title="The whole journey. Thoughtfully connected."
        text="How you look, what you say, and how people find you should work together. Choose a focused piece of work or connect several disciplines around one clear goal."
      />
      <div className="container service-directory">
        {services.map((service) => (
          <article key={service.slug} className="service-directory-item">
            <span className="large-number">{service.number}</span>
            <div>
              <span className="micro accent">{service.stage}</span>
              <h2>
                <Link href={`/services/${service.slug}`}>
                  {service.title} <span aria-hidden="true">↗</span>
                </Link>
              </h2>
              <p>{service.intro}</p>
              <ul className="directory-topics">
                {service.groups.map((group) => (
                  <li key={group.title}>{group.title}</li>
                ))}
              </ul>
              <Link className="text-link" href={`/services/${service.slug}`}>
                Explore {service.title.toLowerCase()} ↗
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section className="container scope-note">
        <h2>The right scope, not the longest list.</h2>
        <p>
          We agree priorities, deliverables, responsibilities, and costs in a
          tailored proposal. Start with the challenge; you do not need to know
          the exact services yet.
        </p>
      </section>
      <ClosingCTA />
    </>
  );
}
