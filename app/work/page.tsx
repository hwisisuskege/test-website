import { PageIntro, ClosingCTA } from "@/components/ui";
import { ProjectVisual } from "@/components/work";
import { caseStudies } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Work & concept explorations",
  "Two clearly labeled concept projects demonstrating website strategy, visual direction, product storytelling, and enquiry design.",
  "/work",
);
export default function Work() {
  return (
    <>
      <PageIntro
        eyebrow="Work / Concept explorations"
        title="Thinking you can see."
        text="Two self-initiated explorations of how strategy becomes an experience. These are imagined businesses, not commissioned client projects. They demonstrate design decisions and capabilities, not business results."
      />
      <div className="container case-studies">
        {caseStudies.map((project) => (
          <article key={project.id} id={project.id} className="case-study">
            <div className="case-title">
              <div>
                <span className="concept-label">Concept project</span>
                <h2>{project.name}</h2>
                <p>{project.type}</p>
              </div>
              <span className="case-scope">{project.scope.join(" / ")}</span>
            </div>
            <ProjectVisual id={project.id} />
            <div className="case-details">
              <div>
                <h3>The imagined brief</h3>
                <p>{project.brief}</p>
              </div>
              <div>
                <h3>The approach</h3>
                <p>{project.approach}</p>
              </div>
              <div>
                <h3>Demonstrated capabilities</h3>
                <ul>
                  {project.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="micro">
                  No client or performance results claimed.
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <ClosingCTA />
    </>
  );
}
