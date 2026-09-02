"use client";

import { useState } from "react";

// "How it works" as a guided journey: numbered nodes strung along a dotted gold
// path that climbs left-to-right, the final step lit brightest. Hovering a node
// lifts and brightens it, its label, and warms the path. All content stays in
// the DOM (real text for SEO/AEO); the path is decorative and aria-hidden. On
// small screens the offer page renders the plain stepped list instead.

export type PathStep = {
  num: string;
  label: string;
  title: string;
  body: string;
};

const W = 1000;
const H = 430;

const ICONS: Record<string, React.ReactNode> = {
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
    </>
  ),
  wrench: (
    <path d="M15 5a4 4 0 0 0-5.3 4.9l-5.4 5.4 2.4 2.4 5.4-5.4A4 4 0 0 0 17 7l-2.3 2.3-1.7-1.7z" />
  ),
  rocket: (
    <>
      <path d="M12 3c2.8 1.2 4.5 4 4.5 7.6L14 13h-4l-2.5-2.4C7.5 7 9.2 4.2 12 3z" />
      <path d="M10 13l-2.5 3.5M14 13l2.5 3.5" />
      <circle cx="12" cy="9" r="1.4" />
    </>
  ),
  chart: <path d="M5 20v-5M10 20V9M15 20v-8M20 20V5" />,
  key: (
    <>
      <circle cx="8" cy="15" r="3.5" />
      <path d="M10.5 12.5 20 3" />
      <path d="M16 7l2.5 2.5M14 9l2.5 2.5" />
    </>
  ),
};

function iconKey(text: string, i: number): string {
  const t = text.toLowerCase();
  if (/scope|research|discover|frame|map|identif/.test(t)) return "search";
  if (/design|architect|plan|blueprint|spec|model/.test(t)) return "document";
  if (/build|implement|engineer|develop|calibrat/.test(t)) return "wrench";
  if (/launch|ship|deploy/.test(t)) return "rocket";
  if (/handover|deliver|own|maintain|credit|hand off/.test(t)) return "key";
  if (/scale|grow|expand|relationship/.test(t)) return "chart";
  if (/tell|inquiry|intro|conversation/.test(t)) return "chat";
  return ["search", "document", "wrench", "key", "chart"][i % 5];
}

function buildPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

export function InteractivePath({ steps }: { steps: PathStep[] }) {
  const n = steps.length;
  const [hi, setHi] = useState<number | null>(null);

  const baseline = 240;
  const climb = 26;
  const amp = 54;
  const pts = steps.map((_, i) => ({
    x: 90 + (i * (W - 180)) / Math.max(1, n - 1),
    y: baseline - i * climb + (i % 2 === 0 ? amp : -amp),
  }));

  return (
    <div
      className="relative mx-auto hidden w-full max-w-[1000px] sm:block"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={buildPath(pts)}
          fill="none"
          stroke="url(#path-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 10"
        />
      </svg>

      {steps.map((s, i) => {
        const p = pts[i];
        const last = i === n - 1;
        const on = hi === i || last;
        const key = iconKey(`${s.label} ${s.title}`, i);
        return (
          <div key={s.num}>
            {/* Number, above the icon */}
            <span
              aria-hidden="true"
              style={{
                left: `${(p.x / W) * 100}%`,
                top: `calc(${(p.y / H) * 100}% - 2.9rem)`,
              }}
              className={`text-gold-sheen font-display pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-xl font-light leading-none transition-opacity duration-300 ${
                on ? "opacity-100" : "opacity-75"
              }`}
            >
              {s.num}
            </span>

            {/* Node */}
            <button
              type="button"
              onMouseEnter={() => setHi(i)}
              onMouseLeave={() => setHi(null)}
              onFocus={() => setHi(i)}
              onBlur={() => setHi(null)}
              style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
              aria-label={`${s.num} ${s.label}`}
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 ${
                  last
                    ? "scale-110 border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_18%,var(--surface))] text-[var(--accent-text)] shadow-[0_0_44px_-4px_color-mix(in_oklab,var(--accent)_75%,transparent)]"
                    : hi === i
                      ? "scale-110 border-[var(--accent)]/80 bg-[color-mix(in_oklab,var(--accent)_10%,var(--surface))] text-[var(--accent-text)] shadow-[0_0_34px_-6px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
                      : "border-[var(--hairline-strong)] bg-[var(--surface)] text-[var(--fg)]/70"
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                >
                  {ICONS[key]}
                </svg>
              </span>
            </button>

            {/* Caption, below the icon: label, tight title, two-line body */}
            <div
              style={{
                left: `${(p.x / W) * 100}%`,
                top: `calc(${(p.y / H) * 100}% + 2.5rem)`,
              }}
              className="pointer-events-none absolute w-[12.5rem] -translate-x-1/2 text-center"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                {s.label}
              </span>
              <h3
                className={`font-display mt-1 text-[length:var(--text-step-1)] font-light leading-tight transition-colors duration-300 ${
                  on ? "text-[var(--fg)]" : "text-[var(--fg)]/85"
                }`}
              >
                {s.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--fg)]/75">
                {s.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
