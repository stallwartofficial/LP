import type { Offering } from "@/data/offerings";

// A compressed signal path for the portfolio cards: entry, the judgment stage,
// and the terminal state. Three nodes.
//
// ALIGNMENT FIX. The nodes previously lived in three 33%-wide flex cells, so
// their centres sat at 0 / 33 / 66 percent, while the traveling ball stops at
// 0 / 50 / 100 percent (see globals.css trace-step). The ball never landed on a
// node. Now the nodes are absolutely positioned at 0 / 50 / 100 with the same
// -50% shift as the ball, so the ball pauses exactly on each node. The brighten
// timings (node-arrive-1/2/3) already peak inside each dwell window.
//
// All three cards run one shared timeline (no per-card delay), so the dots move
// in unison. Container-query labels appear once the card is wide enough.
export function MiniPath({ offering }: { offering: Offering }) {
  const { stages, label } = offering.flow;
  const points = [stages[0], stages[1], stages[stages.length - 1]];
  const spoken = `${label}: ${points.map((p) => p.name).join(", then ")}.`;
  // Left position matching the ball's dwell stops.
  const posAt = ["0%", "50%", "100%"];

  return (
    <div className="cq mt-5" role="img" aria-label={spoken}>
      <div aria-hidden="true" className="relative h-2.5">
        {/* Rail. Inset by the node radius so it starts and ends under the end
            nodes rather than poking past them. */}
        <div className="absolute left-1.5 right-1.5 top-1/2 h-px -translate-y-1/2 bg-[var(--hairline-strong)]" />

        {/* Nodes at 0 / 50 / 100 percent, centred on each stop. */}
        {points.map((point, i) => (
          <span
            key={point.name}
            className={`node-arrive-${i + 1} absolute top-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
              i === points.length - 1
                ? "border-[var(--accent)] bg-[var(--accent)]/20"
                : "border-[var(--hairline-strong)] bg-[var(--bg)]"
            }`}
            style={{ left: posAt[i] }}
          />
        ))}

        {/* The traveling signal. Dwells on each node via trace-step. */}
        <span className="trace-step absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
      </div>

      {/* Labels under the nodes: left / center / right so they track 0/50/100. */}
      <div className="mt-2.5 hidden grid-cols-3 [@container(min-width:13rem)]:grid">
        {points.map((point, i) => (
          <span
            key={point.name}
            className={`font-mono text-[9px] uppercase tracking-[0.08em] leading-tight text-[var(--fg)]/70 ${
              i === 1 ? "text-center" : i === 2 ? "text-right" : "text-left"
            }`}
          >
            {point.name}
          </span>
        ))}
      </div>
    </div>
  );
}
