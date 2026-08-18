import type { Offering } from "@/data/offerings";

// A compressed signal path for the portfolio cards: entry, the judgement stage,
// and the terminal state. Three nodes instead of five.
//
// THE DOT DWELLS. It stops at each stage for roughly a fifth of the cycle
// instead of sliding continuously, because a sliding dot reads as decoration
// while a dot that stops at Scope, then Technical design, then You own it reads
// as a process with stages. Each node brightens as the dot arrives. See
// globals.css: trace-step, node-arrive.
//
// Container query driven (.cq), so the labels appear once the card is wide
// enough to hold them on one line. That replaced shipping a horizontal and a
// vertical copy of every diagram in the DOM.
export function MiniPath({ offering }: { offering: Offering }) {
  const { stages, label } = offering.flow;
  const points = [stages[0], stages[1], stages[stages.length - 1]];

  const spoken = `${label}: ${points.map((p) => p.name).join(", then ")}.`;

  return (
    <div className="cq mt-5" role="img" aria-label={spoken}>
      <div aria-hidden="true" className="relative">
        <div className="absolute inset-x-0 top-[5px] h-px bg-[var(--hairline-strong)]" />

        {/* The dwelling signal. */}
        <span className="trace-step absolute top-[2px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />

        <ol className="relative flex justify-between">
          {points.map((point, i) => (
            <li
              key={point.name}
              className="flex flex-col items-start"
              style={{ width: `${100 / points.length}%` }}
            >
              <span
                className={`node-arrive-${i + 1} block h-3 w-3 rounded-full border ${
                  i === points.length - 1
                    ? "border-[var(--accent)] bg-[var(--accent)]/20"
                    : "border-[var(--hairline-strong)] bg-[var(--bg)]"
                }`}
              />
              <span className="font-mono mt-2.5 hidden text-[9px] uppercase tracking-[0.08em] leading-tight text-[var(--fg)]/70 [@container(min-width:13rem)]:block">
                {point.name}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
