import Link from "next/link";
import { Hero } from "@/components/hero";
import { ServiceExplorer } from "@/components/service-explorer";
import { Audiences, Process, FAQ } from "@/components/sections";
import { WorkPreview } from "@/components/work";
import { ClosingCTA } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "From first impression to next customer",
  "Website design, social content, and digital campaigns that connect your first impression to the next customer.",
);
export default function Home() {
  return (
    <>
      <Hero />
      <div className="connection-strip">
        <div className="container">
          <span>
            Presence <i>→</i> Attention <i>→</i> Action
          </span>
          <Link href="/services">Explore our services ↗</Link>
        </div>
      </div>
      <ServiceExplorer />
      <Audiences />
      <WorkPreview />
      <Process />
      <FAQ />
      <ClosingCTA />
    </>
  );
}
