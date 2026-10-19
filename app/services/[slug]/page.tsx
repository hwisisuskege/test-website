import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { CTA, ClosingCTA, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return service
    ? pageMetadata(service.title, service.intro, `/services/${slug}`)
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return (
    <>
      <section className="container page-intro service-intro">
        <Link className="back-link" href="/services">
          ← All services
        </Link>
        <Eyebrow>
          {service.number} / {service.stage} / {service.title}
        </Eyebrow>
        <h1>{service.headline}</h1>
        <div className="intro-bottom">
          <p className="lede">{service.intro}</p>
          <CTA />
        </div>
      </section>
      <section className="service-detail-section">
        <div className="container service-detail-layout">
          <aside>
            <span className="micro">WHAT WE CAN HELP WITH</span>
            <nav aria-label={`${service.title} categories`}>
              {service.groups.map((g, i) => (
                <a key={g.title} href={`#category-${i + 1}`}>
                  {String(i + 1).padStart(2, "0")} / {g.title}
                </a>
              ))}
            </nav>
          </aside>
          <div>
            {service.groups.map((g, i) => (
              <article
                key={g.title}
                id={`category-${i + 1}`}
                className="service-group"
              >
                <span className="micro">
                  {service.number}.{String(i + 1).padStart(2, "0")}
                </span>
                <h2>{g.title}</h2>
                <p>{g.problem}</p>
                <h3>Typical deliverables</h3>
                <ul>
                  {g.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="when-note">{g.when}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="container scope-note">
        <h2>A clear agreement from the start.</h2>
        <p>{service.note}</p>
      </div>
      <ClosingCTA />
    </>
  );
}
