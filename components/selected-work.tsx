"use client";

import Link from "next/link";
import { useState } from "react";
import { caseStudies } from "@/lib/content";
import { ProjectVisual } from "./work";
import { Eyebrow } from "./ui";
import { Reveal } from "./reveal";

const notes = ["Warmth, space, and the feeling of being somewhere you belong.", "A complex product, expressed with clarity and room to breathe."];

export function SelectedWork() {
  const [selected, setSelected] = useState(0);
  const project = caseStudies[selected];
  return <section className="selected-work" id="selected-work"><div className="container">
    <Reveal><div className="gallery-heading"><div><Eyebrow>Two worlds. One considered approach.</Eyebrow><h2>You can feel<br /><em>the difference.</em></h2></div><p>Different businesses deserve different expressions.<br />Two imagined briefs. Two distinct points of view.</p></div></Reveal>
    <div className="gallery-layout">
      <div className="gallery-index" role="group" aria-label="Select a concept project">
        {caseStudies.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)} className={selected === index ? "is-selected" : ""}><span className="micro">0{index + 1} / {item.type}</span><span className="gallery-name">{item.name}<span aria-hidden="true">↗</span></span></button>)}
        <p className="gallery-disclosure">Concept projects<br /><span>Self-initiated explorations.<br />Imagined businesses, no claimed results.</span></p>
      </div>
      <div className="gallery-stage">
        <div key={project.id} className="gallery-frame"><ProjectVisual id={project.id} /></div>
        <div className="gallery-caption" aria-live="polite"><div><span className="micro">{project.scope.join(" / ")}</span><p>{notes[selected]}</p></div><Link href={`/work#${project.id}`} className="text-link">Inside the concept <span aria-hidden="true">↗</span></Link></div>
      </div>
    </div>
  </div></section>;
}
