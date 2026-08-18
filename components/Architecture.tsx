import { site } from "@/data/site";
import { offerings } from "@/data/offerings";

// "One engine" as a single diagram.
//
// WHAT CHANGED. The four layers used to sit below the diagram as a separate row
// of cards, where they read as four unexplained words. They are now inside the
// engine block itself, which is the only place they mean anything: the systems
// sit on top, the layers are the strata they run through, and the layer a system
// depends on is stated on the system.
//
// Engineering line work only: hairlines, small nodes, monospace labels. Server
// component, no JavaScript. The single travelling signal is CSS that stops under
// reduced motion.
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
            className="font-display weight-in mt-3 text-display-sm font-light"
          >
            Inside{" "}
            <span className="text-gold-sheen italic">the engine.</span>
          </h2>
          <p className="mt-4 text-[var(--fg)]/75">{architecture.lead}</p>
        </div>

        <div className="mt-12 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5 sm:p-8">
          {/* ---------- Systems, sitting on top of the engine ---------- */}
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/70">
            Systems
          </p>

          <ul className="mt-4 grid gap-px bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map((offering) => (
              <li key={offering.slug} className="bg-[var(--surface)] p-4">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      offering.status === "available"
                        ? "bg-[var(--accent)]"
                        : "border border-[var(--fg)]/40"
                    }`}
                  />
                  <span className="font-display text-[length:var(--text-step-1)] leading-tight">
                    {offering.name}
                  </span>
                </span>

                {/* Which strata this system runs through. */}
                <span className="mt-2.5 flex flex-wrap gap-1">
                  {architecture.layers.map((layer) => {
                    const uses = offering.layers.includes(layer.name);
                    return (
                      <span
                        key={layer.name}
                        title={`${layer.name}: ${uses ? "used" : "not used"}`}
                        className={`h-1 w-5 rounded-full ${
                          uses ? "bg-[var(--accent)]" : "bg-[var(--hairline-strong)]"
                        }`}
                        aria-hidden="true"
                      />
                    );
                  })}
                  <span className="sr-only">
                    Runs through {offering.layers.join(", ")}.
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {/* ---------- Converging connectors ---------- */}
          <div aria-hidden="true" className="relative h-14">
            {/* One drop per system, derived so adding an offering cannot
                desynchronise the diagram from the portfolio. */}
            <div className="absolute inset-x-0 top-0 flex justify-around">
              {offerings.map((offering) => (
                <span
                  key={offering.slug}
                  className="block h-6 w-px bg-[var(--hairline-strong)]"
                />
              ))}
            </div>
            {/* Collector, inset to the first and last drop. */}
            <div
              className="absolute top-6 h-px bg-[var(--hairline-strong)]"
              style={{
                left: `${100 / offerings.length / 2}%`,
                right: `${100 / offerings.length / 2}%`,
              }}
            />
            {/* Single spine into the engine, with the signal tracing down it. */}
            <div className="absolute left-1/2 top-6 h-8 w-px -translate-x-1/2 bg-[var(--hairline-strong)]">
              <span className="trace-y absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
            </div>
          </div>

          {/* ---------- The engine, with its layers inside it ---------- */}
          <div className="rounded-xl border border-[var(--accent)]/50 bg-[var(--bg)] p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-display text-[length:var(--text-step-2)]">
                {site.company} engineering core
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
                Every build, every engagement
              </p>
            </div>

            <ol className="mt-6 grid gap-px bg-[var(--hairline)] lg:grid-cols-4">
              {architecture.layers.map((layer, i) => (
                <li key={layer.name} className="relative bg-[var(--bg)] p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--accent-text)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < architecture.layers.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="text-sm text-[var(--fg)]/30"
                      >
                        →
                      </span>
                    )}
                  </div>

                  <h3 className="font-display mt-3 text-[length:var(--text-step-1)]">
                    {layer.name}
                  </h3>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--fg)]/70">
                    {layer.role}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--fg)]/75">
                    {layer.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
