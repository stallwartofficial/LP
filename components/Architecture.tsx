import { site } from "@/data/site";

// The engineering core, as one diagram.
//
// WHAT CHANGED. This used to map data/offerings (Extrovert, Sillage) as the
// "systems" sitting on top of the engine, which pulled the products onto the
// home page. Removed entirely. The section is now purely the four shared layers
// every build moves through: Decide -> Route -> Enforce -> Run, shown as a
// left-to-right pipeline with one CSS signal tracing it (stops under reduced
// motion). Server component, no JavaScript.
const FLOW = ["Decide", "Route", "Enforce", "Run"] as const;

export function Architecture() {
  const { architecture } = site;

  return (
    <section
      aria-labelledby="architecture-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="eyebrow">One engineering standard</p>
          <h2
            id="architecture-heading"
            className="font-display mt-3 text-display-sm font-light"
          >
            Every build runs on{" "}
            <span className="text-gold-sheen italic">the same engine.</span>
          </h2>
          <p className="mt-4 text-[var(--fg)]/75">{architecture.lead}</p>
        </div>

        {/* The engine block, with the four layers inside it. */}
        <div className="mt-12 rounded-2xl border border-[var(--accent)]/40 bg-[var(--surface)] p-5 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-display text-[length:var(--text-step-2)]">
              {site.company} engineering core
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
              Every build, every engagement
            </p>
          </div>

          {/* Signal rail: a single hairline with the traveling dot on it. */}
          <div aria-hidden="true" className="relative mt-8 hidden h-px bg-[var(--hairline-strong)] lg:block">
            <span className="trace-x absolute top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
          </div>

          <ol className="mt-6 grid gap-px overflow-hidden rounded-xl bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {architecture.layers.map((layer, i) => (
              <li key={layer.name} className="group relative bg-[var(--bg)] p-5 transition-colors duration-300 hover:bg-[var(--surface)]">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")} · {FLOW[i]}
                  </span>
                </div>

                <h3 className="font-display mt-3 text-[length:var(--text-step-1)]">
                  {layer.name}
                </h3>
                <p className="mt-2 text-xs leading-snug text-[var(--fg)]/85">
                  {layer.plain}
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--fg)]/70">
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
    </section>
  );
}
