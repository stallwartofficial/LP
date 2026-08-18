import { site } from "@/data/site";
import { offerings } from "@/data/offerings";

// "One engineering standard" as an actual diagram: three named systems
// converging into a shared core, then the four layers of that core spelled out.
//
// This is the section that earns the phrase "three systems, one standard".
// Before it existed the phrase was a heading with nothing behind it.
//
// Engineering line work only: hairlines, small nodes, monospace labels. No
// particles, no glow networks, no 3D. Server component, no JavaScript, and the
// single traced signal is CSS that stops under reduced motion.
export function Architecture() {
  const { architecture } = site;

  return (
    <section
      aria-labelledby="architecture-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="eyebrow">Architecture</p>
          <h2
            id="architecture-heading"
            className="font-display mt-4 text-display-sm font-light"
          >
            {architecture.heading}
          </h2>
          <p className="mt-4 text-[var(--fg)]/75">{architecture.lead}</p>
        </div>

        {/* ---------------- The convergence diagram ---------------- */}
        <div className="mt-14 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-9">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/70">
            Stallwart systems
          </p>

          {/* Three system nodes */}
          <ul className="mt-6 grid gap-px bg-[var(--hairline)] sm:grid-cols-3">
            {offerings.map((offering) => (
              <li
                key={offering.slug}
                className="bg-[var(--surface)] p-4 sm:p-5"
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      offering.status === "available"
                        ? "bg-[var(--accent)]"
                        : "border border-[var(--fg)]/40"
                    }`}
                  />
                  <span className="font-display text-[length:var(--text-step-1)]">
                    {offering.name}
                  </span>
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {offering.layers.map((layer) => (
                    <span
                      key={layer}
                      className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--fg)]/70"
                    >
                      {layer}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          {/* Converging connectors: three drops into one spine. */}
          <div aria-hidden="true" className="relative h-16">
            <div className="absolute inset-x-0 top-0 flex justify-around">
              <span className="block h-7 w-px bg-[var(--hairline-strong)]" />
              <span className="block h-7 w-px bg-[var(--hairline-strong)]" />
              <span className="block h-7 w-px bg-[var(--hairline-strong)]" />
            </div>
            {/* Horizontal collector */}
            <div className="absolute left-[16.6%] right-[16.6%] top-7 h-px bg-[var(--hairline-strong)]" />
            {/* Single spine into the core, with the signal tracing down it. */}
            <div className="absolute left-1/2 top-7 h-9 w-px -translate-x-1/2 bg-[var(--hairline-strong)]">
              <span className="trace-y absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
            </div>
          </div>

          {/* The core */}
          <div className="rounded-xl border border-[var(--accent)]/50 bg-[var(--bg)] p-5 text-center sm:p-6">
            <p className="font-display text-[length:var(--text-step-2)]">
              Stallwart engineering core
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
              {architecture.layers.map((l) => l.name).join(" · ")}
            </p>
          </div>
        </div>

        {/* ---------------- The four layers, spelled out ---------------- */}
        <ol className="mt-14 grid gap-px bg-[var(--hairline)] lg:grid-cols-4">
          {architecture.layers.map((layer, i) => (
            <li
              key={layer.name}
              className="scroll-fade bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--surface)] sm:p-7"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Arrow between layers, showing direction of travel. */}
                {i < architecture.layers.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-[var(--fg)]/30 lg:block"
                  >
                    →
                  </span>
                )}
              </div>

              <h3 className="font-display mt-4 text-[length:var(--text-step-2)]">
                {layer.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[var(--fg)]/70">
                {layer.role}
              </p>
              <p className="mt-4 text-sm text-[var(--fg)]/75">{layer.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
