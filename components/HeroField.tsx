// Hero backdrop: a centered amber glow, a radial-masked dot grid, and faint
// corner crosshairs. Brand-tuned (gold on ink / ink on cream) and theme-aware
// through tokens, so it reads correctly in both themes. Pure CSS (styles in
// globals.css), aria-hidden, -z-10 — it never competes with the LCP headline.
const PLUS = (
  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
    <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const CORNERS = [
  "left-5 top-24 sm:left-8",
  "right-5 top-24 sm:right-8",
  "left-5 bottom-24 sm:left-8",
  "right-5 bottom-24 sm:right-8",
];

export function HeroField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="hero-field-grid" />
      <div className="hero-field-glow" />
      {CORNERS.map((pos) => (
        <span
          key={pos}
          className={`absolute h-3.5 w-3.5 text-[var(--fg)]/20 ${pos}`}
        >
          {PLUS}
        </span>
      ))}
    </div>
  );
}
