import { Reveal } from "./Reveal";

// The "how it works" map: a numbered node per step (icon + title in a pill,
// gold on the final outcome), arrows between on desktop, a one-line body under
// each, then a "logic behind it" row and a closing line. Horizontal on desktop,
// stacked on mobile. All CSS, no client JS.

type Step = { icon: string; title: string; body: string };

const icons: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M20 20l-5.5-5.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" />
    </>
  ),
  pencil: (
    <>
      <path d="M14 4l6 6L9 21H3v-6z" />
      <path d="M12.5 6.5l5 5" />
    </>
  ),
  send: (
    <>
      <path d="M21 4 3 11l6 2 2 6z" />
      <path d="M21 4 11 14" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </>
  ),
};

function StepIcon({ name }: { name: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      {icons[name] ?? icons.target}
    </svg>
  );
}

function Badge({ n, accent }: { n: number; accent?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] ${
        accent
          ? "border-[var(--accent)] text-[var(--accent-text)]"
          : "border-[var(--accent)]/60 text-[var(--accent-text)]"
      }`}
    >
      {n}
    </span>
  );
}

export function HowItWorksMap({
  steps,
  logic,
}: {
  steps: Step[];
  logic: string[];
}) {
  return (
    <div className="mt-7">
      {/* Steps */}
      <ol className="grid gap-x-4 gap-y-6 sm:grid-cols-5">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <Reveal as="li" index={i} key={s.title} className="group relative">
              {/* Numbered badge over the pill's corner. */}
              <span className="absolute -left-1.5 -top-2 z-10">
                <Badge n={i + 1} accent={last} />
              </span>

              <div
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all duration-300 group-hover:-translate-y-0.5 ${
                  last
                    ? "border-[var(--accent)]/70 bg-[var(--accent)]/[0.06] group-hover:border-[var(--accent)]"
                    : "border-[var(--hairline-strong)] bg-[var(--surface)] group-hover:border-[var(--accent)]/60 group-hover:bg-[var(--accent)]/[0.04]"
                }`}
              >
                <span
                  className={`transition-colors duration-300 ${
                    last
                      ? "text-[var(--accent-text)]"
                      : "text-[var(--fg)]/80 group-hover:text-[var(--accent-text)]"
                  }`}
                >
                  <StepIcon name={s.icon} />
                </span>
                <span
                  className={`font-display text-sm leading-tight transition-colors duration-300 ${
                    last
                      ? "text-[var(--accent-text)]"
                      : "group-hover:text-[var(--accent-text)]"
                  }`}
                >
                  {s.title}
                </span>
              </div>

              {/* Arrow to the next step (desktop only). */}
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-0.85rem] top-[1.15rem] hidden text-sm text-[var(--accent-text)] sm:block"
                >
                  →
                </span>
              )}

              <p className="mt-2 text-[13px] leading-snug text-[var(--fg)]/60">
                {s.body}
              </p>
            </Reveal>
          );
        })}
      </ol>

      {/* The logic behind it */}
      <div className="mt-9 flex items-center gap-4">
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--hairline)]" />
        <span className="eyebrow shrink-0">The logic behind it</span>
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--hairline)]" />
      </div>

      <ol className="mt-6 grid gap-x-4 gap-y-4 sm:grid-cols-5">
        {logic.map((t, i) => (
          <Reveal as="li" index={i} key={t} className="group flex gap-2.5">
            <Badge n={i + 1} />
            <p className="text-[13px] leading-snug text-[var(--fg)]/60 transition-colors duration-300 group-hover:text-[var(--fg)]/90">
              {t}
            </p>
          </Reveal>
        ))}
      </ol>

      <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
        Put your entire GTM on autopilot.
      </p>
    </div>
  );
}
