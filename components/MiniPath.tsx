import type { Offering } from "@/data/offerings";

// A compressed signal path for the portfolio cards: first stage, the judgement
// stage, last stage. Three nodes instead of five.
//
// The full five stage diagram lives on the offering detail page. Here it is
// texture that still carries meaning, which is what lets four cards replace
// four full height modules without losing the engineering language.
//
// Container query driven (.cq on the card), so it reflows to the card width
// rather than the viewport. That is what removed the previous approach of
// shipping a horizontal and a vertical copy of every diagram in the DOM.
export function MiniPath({ offering }: { offering: Offering }) {
  const { stages } = offering.flow;
  const points = [stages[0], stages[1], stages[stages.length - 1]];

  const spoken = `${offering.flow.label}: ${points.map((p) => p.name).join(" to ")}.`;

  return (
    <div className="cq mt-5" role="img" aria-label={spoken}>
      <div aria-hidden="true" className="relative">
        {/* Rail */}
        <div className="absolute inset-x-0 top-[5px] h-px bg-[var(--hairline-strong)]" />
        {/* One travelling signal. Staggered per card by --trace-delay. */}
        <span className="trace-x absolute top-[2px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />

        <ol className="relative flex justify-between">
          {points.map((point, i) => (
            <li
              key={point.name}
              className="flex flex-col items-start"
              style={{ width: `${100 / points.length}%` }}
            >
              <span
                className={`block h-3 w-3 rounded-full border ${
                  i === points.length - 1
                    ? "border-[var(--accent)] bg-[var(--accent)]/20"
                    : "border-[var(--hairline-strong)] bg-[var(--bg)]"
                }`}
              />
              {/* @container: the labels only appear once the card is wide
                  enough to hold them without wrapping to two lines. */}
              <span className="mt-2.5 hidden text-[10px] leading-tight text-[var(--fg)]/70 [@container(min-width:13rem)]:block">
                {point.name}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
