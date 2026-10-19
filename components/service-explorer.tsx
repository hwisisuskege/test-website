"use client";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/content";
import { Eyebrow } from "./ui";
import { Reveal } from "./reveal";
const chapterTitles = ["A place to belong.", "A voice to recognise.", "A reason to act."];
const chapterWords = ["Presence.", "Attention.", "Action."];
export function ServiceExplorer() {
  const [selected, setSelected] = useState(0);
  const service = services[selected];
  return (
    <section className="services-explorer section container" id="services">
      <Reveal><div className="section-heading">
        <Eyebrow>What happens after the first impression</Eyebrow>
        <h2>
          Attention is a moment.<br />
          <em>Connection takes care.</em>
        </h2>
        <p>
          Three disciplines, shaped around the way<br />people discover, understand, and choose you.
        </p>
      </div></Reveal>
      <div className="explorer-grid">
        <div
          className="service-tabs"
          role="tablist"
          aria-label="Services"
          aria-orientation="vertical"
        >
          {services.map((item, i) => (
            <button
              key={item.slug}
              role="tab"
              id={`service-tab-${i}`}
              aria-controls="service-panel"
              aria-selected={selected === i}
              tabIndex={selected === i ? 0 : -1}
              onKeyDown={(e) => {
                let next = selected;
                if (e.key === "ArrowDown") next = (selected + 1) % 3;
                else if (e.key === "ArrowUp") next = (selected + 2) % 3;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = 2;
                else return;
                e.preventDefault();
                setSelected(next);
                document.getElementById(`service-tab-${next}`)?.focus();
              }}
              onClick={() => setSelected(i)}
            >
              <span className="micro">
                {item.number} / {item.stage}
              </span>
              <strong>{item.title}</strong>
              <span className="tab-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
        <div
          id="service-panel"
          className="service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${selected}`}
          tabIndex={0}
        >
          <div className={`discipline-art discipline-${selected}`} aria-hidden="true"><span className="discipline-line"/><span className="discipline-loop"/><span className="discipline-loop second-loop"/><span className="discipline-word">{chapterWords[selected]}</span><span className="micro">{service.number} / The next chapter</span></div>
          <h3>{chapterTitles[selected]}</h3>
          <p className="discipline-description">{service.short}</p>
          <ul className="deliverable-preview">
            {service.groups.slice(0, 4).map((group) => (
              <li key={group.title}>{group.title}</li>
            ))}
          </ul>
          <Link href={`/services/${service.slug}`} className="text-link">
            Explore {selected === 0 ? "websites" : service.title.toLowerCase()}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
