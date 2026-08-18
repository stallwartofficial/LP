// The hero set piece: the Stallwart engagement + engineering flow, drawn as a
// technical schematic that constructs itself on load.
//
// FLOW (per owner):
//   INPUT  ->  DESIGN  ->  [ CORE, the 4-layer engine ]  ->  MVP / DEMO  ->
//   ACTION  ->  PRODUCTION
//   with a dashed branch off DESIGN: the client can walk away with the design.
//
// The CORE box names the four engineering layers the whole company runs on
// (Intelligence, Orchestration, Governance, Production) and the standard they
// are held to (reliable, honest, scalable). Same vocabulary as the Architecture
// section, so the hero and that section now agree.
//
// All motion is CSS (globals.css: bp-draw, bp-pop, bp-settle); server component,
// zero JavaScript. Reduced motion gets the finished drawing instantly.

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

type Line = { d: string; len: number; delay: number; dashed?: boolean };
type Node = { cx: number; cy: number; r: number; delay: number; filled?: boolean };
type Label = {
  x: number;
  y: number;
  text: string;
  delay: number;
  anchor?: "start" | "middle" | "end";
};

const SPINE: Line[] = [
  { d: "M44 140 H150", len: 106, delay: 0.15, dashed: true },
  { d: "M150 140 H250", len: 100, delay: 0.5 },
  { d: "M430 140 H505", len: 75, delay: 1.05 },
  { d: "M505 140 H590", len: 85, delay: 1.2 },
  { d: "M590 140 H688", len: 98, delay: 1.35 },
];

const BRANCH: Line = { d: "M150 158 V236 H70", len: 158, delay: 0.75, dashed: true };

const NODES: Node[] = [
  { cx: 44, cy: 140, r: 4, delay: 0.4 },
  { cx: 150, cy: 140, r: 8, delay: 0.46 },
  { cx: 70, cy: 236, r: 4, delay: 1.0 },
  { cx: 505, cy: 140, r: 5, delay: 1.15 },
  { cx: 590, cy: 140, r: 4, delay: 1.3 },
  { cx: 688, cy: 140, r: 5, delay: 1.5, filled: true },
];

const LABELS: Label[] = [
  { x: 44, y: 122, text: "INPUT", delay: 0.45, anchor: "start" },
  { x: 150, y: 120, text: "DESIGN", delay: 0.6, anchor: "middle" },
  { x: 70, y: 258, text: "WALK AWAY WITH THE DESIGN", delay: 1.05, anchor: "start" },
  { x: 505, y: 122, text: "MVP / DEMO", delay: 1.25, anchor: "middle" },
  { x: 590, y: 122, text: "ACTION", delay: 1.4, anchor: "middle" },
  { x: 700, y: 122, text: "PRODUCTION", delay: 1.6, anchor: "end" },
];

const vars = (len: number | null, delay: number) =>
  ({
    ...(len === null ? {} : { "--bp-len": len }),
    "--bp-delay": `${delay}s`,
  }) as React.CSSProperties;

export function Blueprint() {
  return (
    <svg
      viewBox="0 0 760 300"
      role="img"
      aria-label="Engagement flow: input becomes a design; the client can walk away with the design, or it enters the Stallwart core, the four-layer engine of Intelligence, Orchestration, Governance and Production held to a reliable, honest, scalable standard, then moves through MVP and demo, into action, and out to production."
      className="w-full"
    >
      {/* Sheet corner marks */}
      <g stroke="var(--hairline-strong)" strokeWidth="1" fill="none">
        {["M2 20 V2 H20", "M740 2 H758 V20", "M758 280 V298 H740", "M20 298 H2 V280"].map(
          (d, i) => (
            <path key={d} d={d} className="bp-line" style={vars(38, i * 0.05)} />
          )
        )}
      </g>

      {/* Spine */}
      <g stroke="var(--hairline-strong)" strokeWidth="1.5" fill="none">
        {SPINE.map((line) => (
          <path
            key={line.d}
            d={line.d}
            className="bp-line"
            strokeDasharray={line.dashed ? "4 4" : undefined}
            opacity={line.dashed ? 0.75 : 1}
            style={vars(line.len, line.delay)}
          />
        ))}
      </g>

      {/* Walk-away branch */}
      <path
        d={BRANCH.d}
        stroke="var(--hairline-strong)"
        strokeWidth="1"
        fill="none"
        className="bp-line"
        strokeDasharray="4 4"
        opacity="0.65"
        style={vars(BRANCH.len, BRANCH.delay)}
      />

      {/* CORE, the four-layer engine */}
      <g fill="none">
        <rect
          x="250"
          y="102"
          width="180"
          height="80"
          rx="2"
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="bp-line"
          style={vars(520, 0.78)}
        />
        <text
          x="340"
          y="126"
          textAnchor="middle"
          className="bp-label"
          style={vars(null, 1.0)}
          fill="var(--accent-text)"
          fontSize="11"
          letterSpacing="2.6"
          fontFamily={MONO}
        >
          CORE
        </text>
        <text
          x="340"
          y="143"
          textAnchor="middle"
          className="bp-label"
          style={vars(null, 1.08)}
          fill="var(--fg)"
          opacity="0.66"
          fontSize="8"
          letterSpacing="1.3"
          fontFamily={MONO}
        >
          4-LAYER ENGINE
        </text>
        <text
          x="340"
          y="164"
          textAnchor="middle"
          className="bp-label"
          style={vars(null, 1.16)}
          fill="var(--fg)"
          opacity="0.5"
          fontSize="6.6"
          letterSpacing="0.8"
          fontFamily={MONO}
        >
          INTELLIGENCE · ORCHESTRATION · GOVERNANCE · PRODUCTION
        </text>
      </g>

      {/* Nodes */}
      <g>
        {NODES.map((n) => (
          <circle
            key={`${n.cx}-${n.cy}`}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            className="bp-node"
            fill={n.filled ? "var(--accent)" : "var(--bg)"}
            stroke="var(--accent)"
            strokeWidth="1.5"
            style={vars(null, n.delay)}
          />
        ))}
      </g>

      {/* Labels */}
      <g fill="var(--fg)" opacity="0.78" fontSize="9" letterSpacing="2" fontFamily={MONO}>
        {LABELS.map((l) => (
          <text
            key={l.text}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            className="bp-label"
            style={vars(null, l.delay)}
          >
            {l.text}
          </text>
        ))}
      </g>

      {/* The standard the core is held to */}
      <text
        x="340"
        y="210"
        textAnchor="middle"
        className="bp-label"
        style={vars(null, 1.7)}
        fill="var(--accent-text)"
        fontSize="8"
        letterSpacing="2"
        fontFamily={MONO}
      >
        RELIABLE · HONEST · SCALABLE
      </text>

      {/* Dimension line */}
      <g
        stroke="var(--hairline-strong)"
        strokeWidth="1"
        fill="none"
        className="bp-line"
        style={vars(644, 2.0)}
      >
        <path d="M44 262 H688" />
        <path d="M44 257 V267 M688 257 V267" />
      </g>
      <text
        x="366"
        y="257"
        textAnchor="middle"
        className="bp-label"
        style={vars(null, 2.25)}
        fill="var(--fg)"
        opacity="0.55"
        fontSize="7.5"
        letterSpacing="1.6"
        fontFamily={MONO}
      >
        DESIGN TO PRODUCTION, END TO END
      </text>

      {/* Title block */}
      <g className="bp-label" style={vars(null, 2.4)}>
        <rect
          x="612"
          y="238"
          width="130"
          height="46"
          fill="none"
          stroke="var(--hairline-strong)"
          strokeWidth="1"
        />
        <line x1="612" y1="258" x2="742" y2="258" stroke="var(--hairline-strong)" strokeWidth="1" />
        <text x="620" y="252" fill="var(--fg)" opacity="0.7" fontSize="7.5" letterSpacing="1.4" fontFamily={MONO}>
          STALLWART SYSTEM
        </text>
        <text x="620" y="272" fill="var(--fg)" opacity="0.5" fontSize="7" letterSpacing="1.3" fontFamily={MONO}>
          REV 02 · SCALE 1:1
        </text>
      </g>
    </svg>
  );
}
