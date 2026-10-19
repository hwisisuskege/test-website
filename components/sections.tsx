import Link from "next/link";
import { faqs, process } from "@/lib/content";
import { Eyebrow } from "./ui";
export function Audiences() {
  return (
    <section className="audiences">
      <div className="container section">
        <Eyebrow>Built around your kind of business</Eyebrow>
        <div className="audience-grid">
          <h2>
            Different challenges. <br />
            <em>The same care.</em>
          </h2>
          <div className="audience-path">
            <span className="micro">01 / LOCAL & SERVICE BUSINESSES</span>
            <h3>
              Be the clear choice <br />
              in your corner of the world.
            </h3>
            <p>
              Show what you do, where you work, and why it matters. Make it
              easier for the right people to find you and start a conversation.
            </p>
            <Link href="/who-we-help#service-businesses" className="text-link">
              Make your expertise visible <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="audience-path">
            <span className="micro">02 / STARTUPS & TECHNOLOGY</span>
            <h3>
              Complex product. <br />
              Compelling story.
            </h3>
            <p>
              Turn product complexity into a clear reason to care. Connect your
              launch, content, and campaigns to a considered demo or sign-up
              journey.
            </p>
            <Link href="/who-we-help#startups" className="text-link">
              Bring your product into focus <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="section container process-section">
      <div className="section-title-row">
        <div>
          <Eyebrow>Clear steps. Shared direction.</Eyebrow>
          <h2>
            From “what if” <br />
            to what’s next.
          </h2>
        </div>
        <p>
          You know your business. <br />
          We bring the questions, craft, and clarity.
        </p>
      </div>
      <ol className="process-list">
        {process.map((step, i) => (
          <li key={step.title}>
            <span className="process-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="section container faq-section">
      <div>
        <Eyebrow>A few things, answered</Eyebrow>
        <h2>
          Before we <br />
          get started.
        </h2>
      </div>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.q}>
            <summary>
              {item.q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
