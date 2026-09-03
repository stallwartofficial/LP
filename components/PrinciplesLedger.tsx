"use client";

import { useEffect, useState } from "react";

// Sticky left-column ledger for the principles page. Tracks which principle
// section is centered in the viewport and highlights it in the ledger; a
// click jumps to that section. Renders nothing until mount so SSR output is
// clean and there is no layout shift.
export function PrinciplesLedger({
  items,
}: {
  items: { n: string; h: string }[];
}) {
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = sections.indexOf(visible[0].target as HTMLElement);
          if (idx >= 0) setActive(idx);
        }
      },
      { threshold: [0.3, 0.55, 0.8], rootMargin: "-20% 0px -20% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Principles ledger"
      className="sticky top-32 self-start"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent-text)]">
          Principles · 4
        </p>
      </div>

      <ol className="mt-8 flex flex-col gap-6 border-l border-[var(--hairline)]">
        {items.map((it, i) => {
          const on = mounted && i === active;
          return (
            <li key={it.n} className="relative">
              {/* The gold indicator sits on the vertical rule; it slides
                  to the active row via transform. */}
              <span
                aria-hidden="true"
                className={`absolute -left-[1.5px] top-3 h-6 w-[3px] rounded-r-full bg-[var(--accent)] transition-opacity duration-500 ${
                  on ? "opacity-100" : "opacity-0"
                }`}
              />
              <a
                href={`#principle-${it.n}`}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-3 pl-6"
              >
                <span
                  className={`font-display text-[length:var(--text-step-3)] font-light leading-none transition-colors duration-300 ${
                    on
                      ? "text-[var(--accent-text)]"
                      : "text-[var(--fg)]/35 group-hover:text-[var(--fg)]/70"
                  }`}
                >
                  {it.n}
                </span>
                <span
                  className={`font-display text-[length:var(--text-step-0)] leading-snug transition-colors duration-300 ${
                    on
                      ? "text-[var(--fg)]"
                      : "text-[var(--fg)]/45 group-hover:text-[var(--fg)]/80"
                  }`}
                >
                  {it.h}
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <p className="mt-10 max-w-[16rem] pl-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/45">
        Read top to bottom, or jump.
      </p>
    </nav>
  );
}
