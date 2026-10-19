"use client";

import { useEffect, useRef } from "react";

/** Content stays visible without JavaScript or with reduced motion. */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = element.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    node.dataset.reveal = "pending";
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        node.dataset.reveal = "visible";
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px 40px 0px", threshold: 0 });
    observer.observe(node);
    const onFocus = () => { node.dataset.reveal = "visible"; observer.disconnect(); };
    node.addEventListener("focusin", onFocus);
    return () => { observer.disconnect(); node.removeEventListener("focusin", onFocus); };
  }, []);
  return <div ref={element} className={`reveal ${className}`}>{children}</div>;
}
