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
    <section className="closing">
      <div className="container">
        <Eyebrow>Good things start with a conversation</Eyebrow>
        <div className="closing-row">
          <h2>
            Your next chapter. <br />
            <span>Let’s make it count.</span>
          </h2>
          <CTA light />
        </div>
        <p>
          A new website, a sharper story, or a better way to reach your
          customers. <br />
          Tell us where you are. We’ll work out what comes next.
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
