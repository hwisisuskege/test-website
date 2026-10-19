"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CTA } from "./ui";

const moments = [
  { stage: "Presence", text: "A website that feels like your business, at its best.", link: "Explore website design", href: "/services/website-design-development" },
  { stage: "Attention", text: "Social content with a point of view people recognise.", link: "Explore social media", href: "/services/social-media" },
  { stage: "Action", text: "Search and campaigns that lead to a considered next step.", link: "Explore digital marketing", href: "/services/digital-marketing" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(true);
  const frame = useRef<HTMLElement>(null);
  const moment = moments[active];

  return (
    <section className={`cinema-hero cinema-moment-${active} ${motion ? "" : "motion-paused"}`} ref={frame}
      onPointerMove={event => {
        if (!motion || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const box = event.currentTarget.getBoundingClientRect();
        frame.current?.style.setProperty("--scene-x", `${((event.clientX - box.left) / box.width - .5) * 12}px`);
        frame.current?.style.setProperty("--scene-y", `${((event.clientY - box.top) / box.height - .5) * 8}px`);
      }}
      onPointerLeave={() => { frame.current?.style.setProperty("--scene-x", "0px"); frame.current?.style.setProperty("--scene-y", "0px"); }}>
      <div className="cinema-image" aria-hidden="true">
        <Image src="/images/presence-sculpture.webp" alt="" fill priority sizes="100vw" quality={88} />
      </div>
      <div className="cinema-shade" aria-hidden="true" />
      <div className="container cinema-content">
        <p className="cinema-kicker"><span /> A creative & technical partnership</p>
        <h1>A presence<br /><em>worth<br className="cinema-line-break" /> pausing for.</em></h1>
        <div className="cinema-intro">
          <p>Distinctive websites. Social with substance.<br />Digital campaigns with a clear destination.</p>
          <CTA />
        </div>
        <span className="cinema-art-note" aria-hidden="true">A study in connection<br />Form / light / possibility</span>
      </div>
      <div className="container cinema-bottom">
        <a href="#the-approach" className="scroll-cue"><span className="scroll-line" aria-hidden="true" />The pause is just the beginning</a>
        <button className="motion-control" onClick={() => setMotion(value => !value)} aria-pressed={!motion} aria-label={motion ? "Pause ambient motion" : "Resume ambient motion"}><span aria-hidden="true">{motion ? "II" : ">"}</span>{motion ? "Pause motion" : "Resume motion"}</button>
      </div>
      <div className="film-strip">
        <div className="container film-strip-inner">
          <div className="film-stages" role="group" aria-label="Explore the connected stages">
            {moments.map((item, index) => <button key={item.stage} onClick={() => setActive(index)} className={active === index ? "is-active" : ""} aria-pressed={active === index}><span>0{index + 1}</span>{item.stage}<span className="stage-marker" aria-hidden="true" /></button>)}
          </div>
          <div className="film-caption" aria-live="polite"><p className="stage-description">{moment.text}</p><Link href={moment.href}>{moment.link} <span aria-hidden="true">↗</span></Link></div>
        </div>
      </div>
    </section>
  );
}
