import Link from "next/link";
import { caseStudies } from "@/lib/content";
import { Eyebrow } from "./ui";
export function ProjectVisual({ id }: { id: string }) {
  return id === "fieldwork" ? (
    <div className="project-visual fieldwork">
      <div className="concept-browser">
        <div className="concept-nav">
          <strong>fieldwork</strong>
          <span>Spaces &nbsp; Our approach &nbsp; ↗</span>
        </div>
        <div className="fieldwork-content">
          <span className="micro">GARDENS WITH ROOM TO GROW</span>
          <h3>
            A little closer <br />
            to <em>nature.</em>
          </h3>
          <div className="landscape-art" aria-hidden="true">
            <div className="landscape-sun" />
            <div className="landscape-hill hill-back" />
            <div className="landscape-hill hill-front" />
            <div className="landscape-path" />
            <span className="tree tree-one" />
            <span className="tree tree-two" />
          </div>
          <span className="concept-bottom">
            Thoughtful landscapes. Living spaces. <b>Explore our work ↗</b>
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="project-visual relay">
      <div className="concept-browser">
        <div className="concept-nav">
          <strong>↗ relay</strong>
          <span>
            Product &nbsp; Why Relay &nbsp; <b>Book a demo ↗</b>
          </span>
        </div>
        <div className="relay-content">
          <span className="micro">LESS FRICTION. MORE FORWARD.</span>
          <h3>
            Good work. <br />
            <em>In motion.</em>
          </h3>
          <p>
            Connect the dots. <br />
            Keep your team moving.
          </p>
          <div className="relay-flow" aria-hidden="true">
            <span>
              ↗<small>IDEA</small>
            </span>
            <i>→</i>
            <span>
              ≋<small>ALIGN</small>
            </span>
            <i>→</i>
            <span>
              ✓<small>GO</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function WorkPreview() {
  return (
    <section className="section work-section container">
      <div className="section-title-row">
        <div>
          <Eyebrow>Ideas made tangible</Eyebrow>
          <h2>
            A glimpse of <br />
            what’s possible.
          </h2>
        </div>
        <Link className="text-link" href="/work">
          Explore the concepts <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="project-grid">
        {caseStudies.map((project) => (
          <Link
            key={project.id}
            href={`/work#${project.id}`}
            className="project-link"
          >
            <div className="project-image-wrap">
              <span className="concept-badge">Concept project</span>
              <ProjectVisual id={project.id} />
            </div>
            <div className="project-caption">
              <div>
                <h3>
                  {project.name}
                  <span> / {project.type}</span>
                </h3>
                <p>{project.scope.join(" · ")}</p>
              </div>
              <span className="circle-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
      <p className="work-disclaimer">
        Self-initiated demonstrations of our thinking and craft. Imagined
        businesses, not client work or performance claims.
      </p>
    </section>
  );
}
