import Link from "next/link";
import { faqs, process } from "@/lib/content";
import { Eyebrow } from "./ui";
import { Reveal } from "./reveal";
export function Audiences() {
  return (
    <section className="audiences editorial-audiences">
      <div className="container section">
        <Eyebrow>Different worlds. Familiar ambitions.</Eyebrow>
        <div className="audience-grid">
          <h2>
            Your world.<br /><em>Understood.</em>
          </h2>
          <div className="audience-path">
            <span className="micro">01 / LOCAL & SERVICE BUSINESSES</span>
            <h3>
              Rooted<br /><em>in a place.</em>
            </h3>
            <p>
              You’ve built a reputation through the work itself. Let’s give it a digital presence that carries the same care—from a local search to a well-informed enquiry.
            </p>
            <Link href="/who-we-help#service-businesses" className="text-link">
              For local & service businesses <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="audience-path">
            <span className="micro">02 / STARTUPS & TECHNOLOGY</span>
            <h3>
              Built around<br /><em>a possibility.</em>
            </h3>
            <p>
              You can see what your product could change. We help other people see it too, with a story they can follow and a launch that feels like one connected idea.
            </p>
            <Link href="/who-we-help#startups" className="text-link">
              For startups & technology companies <span aria-hidden="true">↗</span>
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
          <Eyebrow>A considered collaboration</Eyebrow>
          <h2>
            Good work starts<br /><em>with good questions.</em>
          </h2>
        </div>
        <p>
          Room to explore. A clear way forward.<br />And you, involved in the decisions that matter.
        </p>
      </div>
      <Reveal><ol className="editorial-process">
        {process.map((step, i) => (
          <li key={step.title}>
            <span className="process-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol></Reveal>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="section container faq-section">
      <div>
        <Eyebrow>The practical things</Eyebrow>
        <h2>
          A little clarity,<br /><em>before we begin.</em>
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
