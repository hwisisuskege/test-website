"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, displayName } from "@/lib/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="header-inner container">
        <Link className="wordmark" href="/" aria-label={`${displayName} home`}>
          {site.logo ? (
            <Image src={site.logo} alt={displayName} width={150} height={36} />
          ) : (
            <>
              <span className="brand-symbol" aria-hidden="true">
                ↗
              </span>
              {displayName}
            </>
          )}
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="main-navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          {site.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="nav-cta"
            href="/start-a-project"
            aria-current={pathname === "/start-a-project" ? "page" : undefined}
          >
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
