import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { ServiceExplorer } from "@/components/service-explorer";
import { Audiences, Process, FAQ } from "@/components/sections";
import { SelectedWork } from "@/components/selected-work";
import { ClosingCTA } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("A presence worth pausing for", "Distinctive websites, social content, and digital campaigns for local businesses and technology startups. From first impression to next conversation.");
export default function Home() {
  return <><Hero /><Manifesto /><SelectedWork /><ServiceExplorer /><Audiences /><Process /><FAQ /><ClosingCTA /></>;
}
