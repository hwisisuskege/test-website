import { ProjectForm } from "@/components/project-form";
import { Eyebrow } from "@/components/ui";
import { deliveryConfigured } from "@/lib/delivery";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Start a project",
  "Tell us what you’re building. Share your goals, services, and project context for a tailored proposal.",
  "/start-a-project",
);
export default function StartProject() {
  return (
    <section className="container project-page">
      <div className="project-aside">
        <Eyebrow>Start a project</Eyebrow>
        <h1>
          Tell us what <br />
          you’re <em>building.</em>
        </h1>
        <p>
          A clear vision or the beginning of one. Both are welcome here.
        </p>
        <p>
          Tell us what you care about, what feels unfinished, and what you’d like to change. A few thoughtful details are enough to begin shaping the right project together.
        </p>
        <div className="project-next">
          <span className="micro">WHAT COMES NEXT</span>
          <ol>
            <li>We review your goals and priorities.</li>
            <li>We clarify the scope together.</li>
            <li>You receive a tailored proposal.</li>
          </ol>
        </div>
        {site.email && (
          <p>
            Prefer email? <br />
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email} ↗
            </a>
          </p>
        )}
        <div className="aside-art" aria-hidden="true">
          ↗
        </div>
      </div>
      <ProjectForm preview={!deliveryConfigured()} />
    </section>
  );
}
