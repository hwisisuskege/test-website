import Link from "next/link";
import { site, displayName } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link href="/" className="wordmark">
          <span className="brand-symbol" aria-hidden="true">
            ↗
          </span>
          {displayName}
        </Link>
        <p>
          From first impression <br />
          to next customer.
        </p>
        <nav aria-label="Footer navigation">
          {site.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/start-a-project">Start a project ↗</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>A point of view. A way forward.</span>
        {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        {site.location && <span>{site.location}</span>}
        <span>Presence. Attention. Action.</span>
      </div>
    </footer>
  );
}
