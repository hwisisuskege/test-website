import { PageIntro, ClosingCTA, Eyebrow } from "@/components/ui";
import { Process } from "@/components/sections";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About our approach",
  "A creative and technical partner connecting brand presence, clear communication, and customer discovery.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="Our approach"
        title="The thinking and the making. Together."
        text="A beautiful website that confuses people misses the point. A campaign that leads to a poor experience does too. We connect creative decisions with the way your business actually works."
      />
      <section className="about-statement">
        <div className="container">
          <span className="about-symbol" aria-hidden="true">
            ↗
          </span>
          <div>
            <Eyebrow>From first impression to next customer</Eyebrow>
            <h2>
              Design earns attention. <br />
              Clarity builds confidence. <br />
              <em>Good experiences invite action.</em>
            </h2>
            <p>
              We work at the intersection of visual identity, communication, and
              technology. For service businesses, that means making expertise
              easy to understand. For startups, it means translating product
              complexity into a useful, persuasive story.
            </p>
          </div>
        </div>
      </section>
      <section className="section container principles">
        <Eyebrow>How we approach the work</Eyebrow>
        {[
          {
            title: "Understand before making.",
            text: "Start with your audience, offer, and constraints. The brief should guide the creative work, not sit forgotten in a folder.",
          },
          {
            title: "Make the useful feel distinctive.",
            text: "Strong art direction and familiar interactions can coexist. Every page needs a clear purpose and an understandable next step.",
          },
          {
            title: "Build for the real world.",
            text: "Consider small screens, keyboard navigation, content updates, and performance from the beginning. The finished experience matters as much as the presentation.",
          },
          {
            title: "Keep decisions and scope clear.",
            text: "Agree priorities and responsibilities. Share work at useful checkpoints. Explain tradeoffs and make room for considered feedback.",
          },
        ].map((p, i) => (
          <article key={p.title}>
            <span className="micro">0{i + 1}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </section>
      <Process />
      <ClosingCTA />
    </>
  );
}
