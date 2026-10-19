"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { CTA, Eyebrow } from "./ui";
const stages = [
  {
    title: "Presence",
    copy: "A website that tells your story clearly.",
    href: "/services/website-design-development",
  },
  {
    title: "Attention",
    copy: "Content that brings the right people closer.",
    href: "/services/social-media",
  },
  {
    title: "Action",
    copy: "A clear path from interest to enquiry.",
    href: "/services/digital-marketing",
  },
];
export function Hero() {
  const [active, setActive] = useState(0);
  const art = useRef<HTMLDivElement>(null);
  return (
    <section className="hero container">
      <div className="hero-top">
        <Eyebrow>Design meets direction</Eyebrow>
        <span className="micro hero-descriptor">
          Creative thinking. Technical craft.
        </span>
      </div>
      <h1>
        <span className="hero-line">
          Make the first <span className="outline-word">impression.</span>
        </span>{" "}
        <span className="hero-line">
          Earn the <em>next</em> conversation.
          <span className="hero-star" aria-hidden="true">
            ✳
          </span>
        </span>
      </h1>
      <div className="hero-bottom">
        <p>
          Websites, social content, and digital campaigns
          <br className="desktop-only" /> for service businesses and ambitious
          startups.
        </p>
        <CTA />
      </div>
      <div
        ref={art}
        className={`hero-art active-${active}`}
        onPointerMove={(e) => {
          if (
            e.pointerType !== "mouse" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          )
            return;
          const r = e.currentTarget.getBoundingClientRect();
          art.current?.style.setProperty(
            "--pointer-x",
            `${((e.clientX - r.left) / r.width - 0.5) * 8}px`,
          );
        }}
        onPointerLeave={() =>
          art.current?.style.setProperty("--pointer-x", "0px")
        }
      >
        <div className="composition-grid" aria-hidden="true" />
        <div className="art-caption">
          <span className="status-dot" />
          ONE CONNECTED EXPERIENCE
          <span className="art-caption-end">FIG. 01 / THE BIG PICTURE</span>
        </div>
        <div className="scene-row">
          <Link
            href={stages[0].href}
            className={`scene website-scene ${active === 0 ? "scene-active" : ""}`}
            onFocus={() => setActive(0)}
            onPointerEnter={() => setActive(0)}
            aria-label="Presence: explore website design and development"
          >
            <div className="mock-browser">
              <i />
              <i />
              <i />
              <span>YOUR NEXT CHAPTER</span>
              <b>↗</b>
            </div>
            <div className="mock-site">
              <span className="mock-wordmark">FORM & FIELD</span>
              <span className="mock-nav">Spaces / Studio / Contact</span>
              <div className="mock-site-title">
                Room for <br />
                <em>something</em> <br />
                extraordinary.
              </div>
              <div className="architect-art">
                <div className="arch-sun" />
                <div className="arch-shape arch-one" />
                <div className="arch-shape arch-two" />
                <div className="arch-floor" />
              </div>
              <div className="mock-site-bottom">
                <span>
                  Considered spaces. <br />
                  Everyday possibility.
                </span>
                <span className="mock-pill">Explore the studio ↗</span>
              </div>
            </div>
          </Link>
          <span className="scene-connector connector-one" aria-hidden="true">
            →
          </span>
          <Link
            href={stages[1].href}
            className={`scene social-scene ${active === 1 ? "scene-active" : ""}`}
            onFocus={() => setActive(1)}
            onPointerEnter={() => setActive(1)}
            aria-label="Attention: explore social media"
          >
            <div className="social-top">
              <span className="social-avatar">f.</span>
              <span>
                formandfield <br />
                <small>A different perspective</small>
              </span>
              <span>•••</span>
            </div>
            <div className="social-poster">
              <span>
                LESS NOISE. <br />
                MORE
              </span>
              <em>feeling.</em>
              <div className="poster-orbit" />
              <span className="poster-foot">
                SPACES THAT MAKE SPACE FOR YOU. ↗
              </span>
            </div>
            <div className="social-bottom">
              <span>♡ &nbsp; ◇ &nbsp; ↗</span>
              <span>▱</span>
            </div>
          </Link>
          <span className="scene-connector connector-two" aria-hidden="true">
            →
          </span>
          <Link
            href={stages[2].href}
            className={`scene enquiry-scene ${active === 2 ? "scene-active" : ""}`}
            onFocus={() => setActive(2)}
            onPointerEnter={() => setActive(2)}
            aria-label="Action: explore digital marketing"
          >
            <div className="enquiry-icon">↗</div>
            <span className="micro">THE NEXT CONVERSATION</span>
            <strong>
              “Let’s make <br />
              something happen.”
            </strong>
            <span className="enquiry-line" />
            <div className="enquiry-bottom">
              <span className="status-dot" />A connection, made.
            </div>
            <span className="concept-note">ILLUSTRATIVE ENQUIRY</span>
          </Link>
        </div>
        <div
          className="stage-controls"
          role="group"
          aria-label="Explore the connected stages"
        >
          {stages.map((stage, i) => (
            <button
              key={stage.title}
              className={active === i ? "selected" : ""}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <span>0{i + 1}</span>
              {stage.title}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <p className="stage-description" aria-live="polite">
          {stages[active].copy}
        </p>
      </div>
      <div className="hero-footnote">
        <span>BUILT TO CONNECT THE DOTS</span>
        <span>
          Scroll to explore <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
