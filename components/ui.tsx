import Link from "next/link";
import { site } from "@/lib/site";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>;
}
export function CTA({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`button ${light ? "button-dark" : ""}`}
      href="/start-a-project"
    >
      {site.cta}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="tiny-cross" aria-hidden="true">
        +
      </span>
      {children}
    </p>
  );
}
export function ClosingCTA() {
  return (
    <section className="closing editorial-closing">
      <div className="container">
        <Eyebrow>Something on your mind?</Eyebrow>
        <div className="closing-row">
          <h2>
            Let’s make<br /><em>something matter.</em>
          </h2>
          <CTA light />
        </div>
        <p>
          Bring the ambition, the half-formed idea, the thing you keep coming back to.<br />We’ll help you find its shape.
        </p>
      </div>
    </section>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p className="lede">{text}</p>
    </section>
  );
}
