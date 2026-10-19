"use client";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/content";
import { Eyebrow } from "./ui";
export function ServiceExplorer() {
  const [selected, setSelected] = useState(0);
  const service = services[selected];
  return (
    <section className="services-explorer section container" id="services">
      <div className="section-heading">
        <Eyebrow>Three disciplines. One direction.</Eyebrow>
        <h2>
          Good on their own. <br />
          <span className="muted">Better together.</span>
        </h2>
        <p>
          A strong website needs the right attention. <br />
          That attention needs somewhere useful to go.
        </p>
      </div>
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
          <div
            className={`service-diagram diagram-${selected}`}
            aria-hidden="true"
          >
            <span className="diagram-ring" />
            <span className="diagram-square" />
            <span className="diagram-cross">↗</span>
            <span className="diagram-label">
              {service.stage.toUpperCase()} / BY DESIGN
            </span>
          </div>
          <h3>{service.short}</h3>
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
