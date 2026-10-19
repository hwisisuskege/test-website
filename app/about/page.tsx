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
        eyebrow="The way we see it"
        title="Care is a creative advantage."
        text="You can feel when something has been considered. In the words that make sense of an idea. In the space around an image. In a small interaction that simply works. That’s the standard we bring to your business."
      />
      <section className="about-statement">
        <div className="container">
          <span className="about-symbol" aria-hidden="true">
            ↗
          </span>
          <div>
            <Eyebrow>The whole experience matters</Eyebrow>
            <h2>
              The idea.<br />The feeling.<br /><em>The way it works.</em>
            </h2>
            <p>
              We think about design, language, and technology together. A visual decision should support the story. The story should help someone understand your value. And the finished experience should make the next step feel natural.
            </p>
          </div>
        </div>
      </section>
      <section className="section container principles">
        <Eyebrow>How we approach the work</Eyebrow>
        {[
          {
            title: "Listen for what’s particular.",
            text: "The useful details are often in the conversation: how you describe a customer, why you built the product, what you refuse to compromise on. That is where the direction begins.",
          },
          {
            title: "Give every detail a reason.",
            text: "Typography, imagery, pacing, and interaction should make the same point. We look for an expression that belongs to your business and helps people understand it.",
          },
          {
            title: "Carry the idea through.",
            text: "The care has to survive the build. We consider performance, small screens, keyboard access, content editing, and the tools your business depends on from the start.",
          },
          {
            title: "Make room for a conversation.",
            text: "We show the thinking behind the work, share it at agreed checkpoints, and ask for focused feedback. Scope, responsibilities, and changes stay visible throughout.",
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
