import type { Offering } from "@/data/offerings";

// A system's signal path, drawn as engineering line work.
//
// WHAT THIS IS NOT, deliberately: a mock dashboard, a chart of invented
// numbers, a particle field, a glowing network, or a floating sphere. Those all
// read as generic AI stock art. This states the actual mechanism stage by
// stage, which is the thing a technical buyer is trying to establish and the
// thing a fake dashboard actively obscures.
//
// Server component. All motion is CSS (see globals.css: trace-x, trace-y,
// node-latch) so there is no JavaScript cost and reduced motion switches it off
// while leaving the diagram fully legible.
//
// Layout: horizontal rail on lg and up, vertical stack below, because five
// labelled nodes cannot read across 375px.

const nodeStyles: Record<string, string> = {
  input: "border-[var(--hairline-strong)] bg-[var(--bg)]",
  model: "border-[var(--accent)] bg-[var(--bg)]",
  action: "border-[var(--accent)]/60 bg-[var(--bg)]",
  output: "border-[var(--accent)] bg-[var(--accent)]/15",
};

export function SystemFlow({
  offering,
  index,
}: {
  offering: Offering;
  index: number;
}) {
  const { flow } = offering;
  const { stages, branch } = flow;

  // Both a horizontal and a vertical layout live in the DOM so the diagram can
  // be responsive without JavaScript. That means the stage names appear twice,
  // so assistive tech gets ONE spoken description here and both visual layouts
  // are hidden from it. Otherwise a screen reader reads the whole path twice.
  const spoken = `${flow.label}: ${stages
    .map((s) => s.name)
    .join(", ")}. ${branch.name} branches from ${stages[branch.fromIndex].name}.`;

  // Stagger the trace between systems so three diagrams on one page read as
  // independent processes rather than one synchronised animation.
  const duration = `${3.4 + index * 0.4}s`;

  return (
    <figure
      role="img"
      aria-label={spoken}
      className="relative rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-7"
      style={
        {
          "--trace-duration": duration,
          "--trace-delay": `${index * 0.5}s`,
        } as React.CSSProperties
      }
    >
      <figcaption className="mb-8 flex items-center justify-between gap-4">
        <span className="eyebrow">{flow.label}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/70">
          {stages.length} stages
        </span>
      </figcaption>

      {/* ---------- Horizontal rail (lg and up) ---------- */}
      <div aria-hidden="true" className="hidden lg:block">
        <div className="relative">
          {/* The rail itself, behind the nodes. */}
          <div className="absolute left-0 right-0 top-[7px] h-px bg-[var(--hairline-strong)]" />
          {/* One signal tracing the rail. */}
          <span
            aria-hidden="true"
            className="trace-x absolute top-[4px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
          />

          <ol className="relative flex justify-between">
            {stages.map((stage, i) => (
              <li
                key={stage.name}
                className="flex flex-col items-start"
                style={{ width: `${100 / stages.length}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`node-latch block h-[15px] w-[15px] rounded-full border ${
                    nodeStyles[stage.kind] ?? nodeStyles.input
                  }`}
                  style={{ animationDelay: `${index * 0.5 + i * 0.12}s` }}
                />
                <span className="mt-4 block max-w-[11ch] text-xs leading-snug text-[var(--fg)]/80">
                  {stage.name}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--fg)]/70">
                  {stage.kind}
                </span>
              </li>
            ))}
          </ol>

          {/* Branch: a dashed drop from the stage that owns the escape hatch. */}
          <div
            className="absolute top-[7px]"
            style={{
              left: `${(branch.fromIndex / stages.length) * 100 + 100 / stages.length / 2}%`,
            }}
          >
            <span
              aria-hidden="true"
              className="block h-14 border-l border-dashed border-[var(--hairline-strong)]"
            />
            <span className="mt-1 flex items-center gap-2 whitespace-nowrap">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full border border-[var(--fg)]/40"
              />
              <span className="text-[11px] text-[var(--fg)]/70">
                {branch.name}
              </span>
            </span>
          </div>

          {/* Reserve the branch's vertical space so it cannot overlap. */}
          <div aria-hidden="true" className="h-28" />
        </div>
      </div>

      {/* ---------- Vertical stack (below lg) ---------- */}
      <div aria-hidden="true" className="lg:hidden">
        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--hairline-strong)]" />
          <span
            aria-hidden="true"
            className="trace-y absolute left-[4px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
          />

          <ol className="relative space-y-6">
            {stages.map((stage, i) => (
              <li key={stage.name}>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className={`node-latch block h-[15px] w-[15px] shrink-0 rounded-full border ${
                      nodeStyles[stage.kind] ?? nodeStyles.input
                    }`}
                    style={{ animationDelay: `${index * 0.5 + i * 0.12}s` }}
                  />
                  <span className="text-sm text-[var(--fg)]/85">
                    {stage.name}
                  </span>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--fg)]/70">
                    {stage.kind}
                  </span>
                </div>

                {i === branch.fromIndex && (
                  <div className="ml-[7px] mt-3 flex items-center gap-3 border-l border-dashed border-[var(--hairline-strong)] pl-5">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full border border-[var(--fg)]/40"
                    />
                    <span className="text-[11px] text-[var(--fg)]/70">
                      {branch.name}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Which core layers this system draws on, tying it to the architecture
          section below. */}
      <div className="rule-t mt-6 flex flex-wrap items-center gap-2 pt-5">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--fg)]/70">
          Core layers
        </span>
        {offering.layers.map((layer) => (
          <span
            key={layer}
            className="rounded-full border border-[var(--hairline-strong)] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--fg)]/70"
          >
            {layer}
          </span>
        ))}
      </div>
    </figure>
  );
}
