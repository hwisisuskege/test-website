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
        eyebrow="Our disciplines"
        title="Every impression leaves a trace."
        text="A website someone remembers. A post they return to. A search that leads to the right conversation. We shape these moments around the same understanding of your business."
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
        <h2>Start with what matters most.</h2>
        <p>
          A focused website project may be the right first move. Or the story may need to connect across several channels. We’ll agree the priorities, deliverables, responsibilities, and investment before anything begins.
        </p>
      </section>
      <ClosingCTA />
    </>
  );
}
