"use client";

import { useEffect, useState } from "react";

// Right-rail anchor dots for the manifesto-scroll principles page. Uses an
// IntersectionObserver to light the dot for whichever section is currently
// centered in the viewport. Renders nothing until mount so SSR output stays
// unchanged; there is no layout shift.
export function PrinciplesRail({ items }: { items: { n: string; h: string }[] }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sections = items
      .map((it) => document.getElementById(`principle-${it.n}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to viewport centre among currently intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = sections.indexOf(visible[0].target as HTMLElement);
          if (idx >= 0) setActive(idx);
        }
      },
      { threshold: [0.35, 0.6, 0.85], rootMargin: "-15% 0px -15% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  if (!mounted) return null;

  return (
    <nav
      aria-label="Principles"
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-6">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.n}>
              <a
                href={`#principle-${it.n}`}
                aria-label={`${it.n}: ${it.h}`}
                className="group flex items-center justify-end gap-3"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                    on
                      ? "translate-x-0 text-[var(--accent-text)] opacity-100"
                      : "translate-x-2 text-[var(--fg)]/40 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {it.h}
                </span>
                <span
                  className={`block h-3 w-3 rounded-full border transition-all duration-300 ${
                    on
                      ? "scale-125 border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_18px_-2px_var(--accent)]"
                      : "border-[var(--hairline-strong)] bg-transparent group-hover:border-[var(--accent)]/60"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
