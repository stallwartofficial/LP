"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { industries as INDUSTRIES, industryShort } from "@/data/industries";

// "AI across your industry": a two-pane explorer. Copy is the single source of
// truth in data/industries.ts (shared with the schema, the /industries hub, and
// each /industries/[slug] page). Only the gold line icons live here, keyed by
// slug, because JSX cannot live in a data module. Every industry's copy renders
// in the DOM (crawlable); state only swaps which pane is lit and visible.
const ic = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
    {d}
  </svg>
);

const ICONS: Record<string, ReactNode> = {
  "travel-hospitality": ic(<><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7Z" /></>),
  "real-estate-construction": ic(<><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" /></>),
  aerospace: ic(<><path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14.5 4.5C16 3 20 3 20 3s0 4-1.5 5.5L12 15l-3-3 6.5-7.5Z" /><circle cx="15" cy="9" r="1" /></>),
  banking: ic(<><path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M3 10l9-6 9 6" /></>),
  "retail-ecommerce": ic(<><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>),
  education: ic(<><path d="M22 9 12 5 2 9l10 4 10-4Z" /><path d="M6 11v5c0 1 3 2 6 2s6-1 6-2v-5" /></>),
  fintech: ic(<><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 5-6" /></>),
  insurtech: ic(<><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>),
  "media-advertising": ic(<><path d="M3 11v2a1 1 0 0 0 1 1h2l6 4V6L6 10H4a1 1 0 0 0-1 1Z" /><path d="M16 8a5 5 0 0 1 0 8" /></>),
  "physical-ai": ic(<><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>),
  healthcare: ic(<path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 3c0 4.5-9.5 12-9.5 12Z" />),
  communication: ic(<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z" />),
  automotive: ic(<><path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5v5h-3v-2H6v2H3v-5Z" /><circle cx="7.5" cy="15.5" r="1.5" /><circle cx="16.5" cy="15.5" r="1.5" /></>),
  mobility: ic(<><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6" /></>),
};

export function IndustryExplorer() {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  // Mobile carousel: auto-advance one card every few seconds and loop, while
  // native swipe still works. Touching it pauses the auto-scroll, which then
  // resumes after a pause. Skipped under reduced-motion.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout>;
    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => (paused = false), 4500);
    };
    el.addEventListener("pointerdown", pause);
    el.addEventListener("touchstart", pause, { passive: true });

    // Measure the card width ONCE (avoids a forced reflow every tick from
    // reading offsetWidth after layout). Recompute only on resize.
    let step = 0;
    const measure = () => {
      const first = el.firstElementChild as HTMLElement | null;
      step = first ? first.offsetWidth + 16 : el.clientWidth;
    };
    measure();
    window.addEventListener("resize", measure);

    const tick = setInterval(() => {
      if (paused || !step) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3500);

    return () => {
      clearInterval(tick);
      clearTimeout(resumeTimer);
      window.removeEventListener("resize", measure);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
    };
  }, []);

  return (
    <section className="section-y rule-t px-[var(--space-gutter)]" id="industries">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">AI across your industry</p>
          <h2 className="font-display mt-3 text-display-sm font-light">
            Wherever you operate, <span className="text-gold-sheen italic">AI fits.</span>
          </h2>
        </Reveal>

        <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          {/* Left: the index, with an icon per industry */}
          <Reveal>
            <ul className="flex flex-col">
              {INDUSTRIES.map((ind, i) => (
                <li key={ind.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`group flex w-full items-center gap-3 border-b border-[var(--hairline)] py-3 text-left transition-[padding,color] duration-300 ease-[var(--ease-out-expo)] ${
                      active === i ? "pl-2 text-[var(--fg)]" : "text-[var(--fg)]/50 hover:pl-1.5 hover:text-[var(--fg)]/80"
                    }`}
                  >
                    <span className={`shrink-0 transition-colors duration-300 ${active === i ? "text-[var(--accent)]" : "text-[var(--fg)]/35"}`}>
                      {ICONS[ind.slug]}
                    </span>
                    <span className="text-[length:var(--text-step-1)] font-light">{ind.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right: the active detail (all render; only active is shown) */}
          <div className="relative lg:sticky lg:top-28 lg:self-start">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={ind.name}
                aria-hidden={active !== i}
                className={`transition-opacity duration-500 ease-[var(--ease-out-expo)] ${
                  active === i ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                  {String(i + 1).padStart(2, "0")} / {ind.name}
                </p>
                <p className="font-display mt-4 text-[length:var(--text-step-3)] font-light leading-[1.15]">
                  In {industryShort(ind.name)}, we build AI that {ind.title}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {ind.tags.map((t) => (
                    <li key={t} className="rounded-full border border-[var(--hairline)] px-3 py-1.5 text-xs text-[var(--fg)]/75">
                      {t}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 max-w-[58ch] text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/70">
                  {ind.detail}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {ind.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-[length:var(--text-step-0)] text-[var(--fg)]/85">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {o}
                    </li>
                  ))}
                </ul>

                <p className="font-display mt-6 max-w-[52ch] text-[length:var(--text-step-1)] font-light italic text-[var(--fg)]/90">
                  {ind.closer}
                </p>

                <Link href={`/industries/${ind.slug}`} className="link-draw mt-7 inline-block text-sm font-medium text-[var(--accent-text)]">
                  See AI for {industryShort(ind.name)}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: an auto-scrolling, swipeable card carousel through all
            industries (desktop uses the two-pane explorer above). */}
        <div
          ref={scroller}
          className="-mx-[var(--space-gutter)] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--space-gutter)] px-[var(--space-gutter)] pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] lg:hidden"
        >
          {INDUSTRIES.map((ind, i) => (
            <article
              key={ind.name}
              className="flex w-[82%] shrink-0 snap-start flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--accent)]/40 text-[var(--accent-text)]">
                  {ICONS[ind.slug]}
                </span>
                <h3 className="font-display text-[length:var(--text-step-2)] font-light leading-tight">
                  {ind.name}
                </h3>
              </div>

              <p className="font-display mt-4 text-[length:var(--text-step-1)] font-light leading-snug">
                In {industryShort(ind.name)}, we build AI that {ind.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/70">{ind.detail}</p>

              <ul className="mt-4 space-y-2">
                {ind.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-[var(--fg)]/85">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    {o}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {ind.tags.map((t) => (
                  <li key={t} className="grow rounded-full border border-[var(--hairline)] px-3 py-1.5 text-center text-xs text-[var(--fg)]/75">
                    {t}
                  </li>
                ))}
              </ul>

              <Link href={`/industries/${ind.slug}`} className="link-draw mt-6 inline-block text-sm font-medium text-[var(--accent-text)]">
                See AI for {industryShort(ind.name)}
              </Link>
              <span className="mt-3 font-mono text-[10px] tracking-[0.2em] text-[var(--fg)]/35">
                {String(i + 1).padStart(2, "0")} / {String(INDUSTRIES.length).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
