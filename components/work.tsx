import Image from "next/image";

/** Imagined projects; their artwork is not evidence of commissioned client work. */
export function ProjectVisual({ id }: { id: string }) {
  if (id === "fieldwork") return <div className="project-art project-art-fieldwork">
    <Image src="/images/fieldwork-garden.webp" alt="Concept imagery: an olive tree, pale stone terraces, and a reflecting pool in a quiet courtyard" fill sizes="(max-width: 800px) 100vw, 75vw" quality={85} />
    <div className="project-art-scrim" />
    <div className="art-site-nav"><span className="fieldwork-logotype">fieldwork</span><span>Landscape & living</span></div>
    <div className="fieldwork-art-title"><span className="micro">A considered way of living outside.</span><p>A little closer<br />to <em>nature.</em></p></div>
    <div className="art-site-foot"><span>Spaces with room to grow.</span><span>Explore the garden <span aria-hidden="true">↗</span></span></div>
  </div>;
  return <div className="project-art project-art-relay">
    <div className="art-site-nav"><span className="relay-logotype"><span aria-hidden="true">↗</span> relay</span><span>Work, in good company.</span></div>
    <div className="relay-art-title"><span className="micro">A shared direction changes everything.</span><p>Room for<br /><em>better work.</em></p></div>
    <div className="relay-orbits" aria-hidden="true"><span className="relay-orbit orbit-one" /><span className="relay-orbit orbit-two" /><span className="relay-orbit orbit-three" /><span className="relay-node node-one" /><span className="relay-node node-two" /><span className="relay-node node-three" /><span className="orbit-label orbit-label-one">An idea</span><span className="orbit-label orbit-label-two">A shared direction</span><span className="orbit-label orbit-label-three">The next step</span></div>
    <div className="art-site-foot"><span>A place for ideas to become a plan.</span><span>Meet Relay <span aria-hidden="true">↗</span></span></div>
  </div>;
}
