import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container page-intro">
      <p className="eyebrow">404 / A small detour</p>
      <h1>This page isn’t here.</h1>
      <p className="lede">Let’s get you back to a useful next step.</p>
      <Link className="button" href="/">
        Back to home ↗
      </Link>
    </section>
  );
}
