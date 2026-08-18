// The hero set piece: a technical drawing that constructs itself.
//
// REBUILT. The first version scattered labels around a loose lattice and read
// as annotation rather than a drawing. This one has a single readable spine,
// left to right, with branches hanging off it and one dashed return loop:
//
//   INPUT ── MODEL ── [ CORE ] ── ACTION
//              │                     │
//            POLICY            OBSERVABILITY
//              └── HUMAN OVERRIDE (dashed, rejoins the core)
//
// Fewer elements, larger, and it states the same architecture the Architecture
// section states in words.
//
// Chosen over a particle field or rotating wireframe deliberately: a measured
// drawing that assembles reads as competence, and it is not a look a competitor
// can buy off a template. It runs once, because a single construction is an
// event and an infinite loop is decoration.
//
// All motion is CSS (globals.css: bp-draw, bp-pop, bp-settle), so this is a
// server component with zero JavaScript, and reduced motion gets the finished
// drawing instantly.

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

type Line = {
  d: string;
  /** Approximate path length. stroke-dasharray needs a number, and guessing
   *  high makes the draw appear to start late. */
  len: number;
  delay: number;
  dashed?: boolean;
};

type Node = { cx: number; cy: number; r: number; delay: number; filled?: boolean };

type Label = {
  x: number;
  y: number;
  text: string;
  delay: number;
  anchor?: "start" | "middle";
};

const SPINE: Line[] = [
  { d: "M20 120 H150", len: 130, delay: 0.1 },
  { d: "M186 120 H286", len: 100, delay: 0.45 },
  { d: "M410 120 H540", len: 130, delay: 1.0 },
];

const BRANCHES: Line[] = [
  { d: "M168 138 V196", len: 58, delay: 0.72 },
  { d: "M540 120 V186", len: 66, delay: 1.2 },
  { d: "M168 214 H120 V244 H330 V138", len: 340, delay: 1.5, dashed: true },
];

const NODES: Node[] = [
  { cx: 20, cy: 120, r: 4, delay: 0.32 },
  { cx: 168, cy: 120, r: 8, delay: 0.38 },
  { cx: 168, cy: 205, r: 4, delay: 0.95 },
  { cx: 540, cy: 120, r: 4, delay: 1.32, filled: true },
];

const LABELS: Label[] = [
  { x: 20, y: 104, text: "INPUT", delay: 0.4, anchor: "start" },
  { x: 168, y: 98, text: "MODEL", delay: 0.6, anchor: "middle" },
  { x: 168, y: 232, text: "POLICY", delay: 1.05, anchor: "middle" },
  { x: 552, y: 116, text: "ACTION", delay: 1.4, anchor: "start" },
  { x: 552, y: 190, text: "OBSERVABILITY", delay: 1.5, anchor: "start" },
  { x: 336, y: 258, text: "HUMAN OVERRIDE", delay: 1.9, anchor: "start" },
];

/** Custom properties the CSS animations read. Typed once, used everywhere. */
const vars = (len: number | null, delay: number) =>
  ({
    ...(len === null ? {} : { "--bp-len": len }),
    "--bp-delay": `${delay}s`,
  }) as React.CSSProperties;

export function Blueprint() {
  return (
    <svg
      viewBox="0 0 720 300"
      role="img"
      aria-label="Technical drawing: input passes through a model into the Stallwart core, then out to action, with policy and observability as branches and a human override path that returns to the core."
      className="w-full"
    >
      {/* Sheet corner marks */}
      <g stroke="var(--hairline-strong)" strokeWidth="1" fill="none">
        {[
          "M2 20 V2 H20",
          "M700 2 H718 V20",
          "M718 280 V298 H700",
          "M20 298 H2 V280",
        ].map((d, i) => (
          <path key={d} d={d} className="bp-line" style={vars(38, i * 0.05)} />
        ))}
      </g>

      {/* The spine */}
      <g stroke="var(--hairline-strong)" strokeWidth="1.5" fill="none">
        {SPINE.map((line) => (
          <path
            key={line.d}
            d={line.d}
            className="bp-line"
            style={vars(line.len, line.delay)}
          />
        ))}
      </g>

      {/* Branches, including the dashed override return */}
      <g stroke="var(--hairline-strong)" strokeWidth="1" fill="none">
        {BRANCHES.map((line) => (
          <path
            key={line.d}
            d={line.d}
            className="bp-line"
            strokeDasharray={line.dashed ? "4 4" : undefined}
            opacity={line.dashed ? 0.65 : 1}
            style={vars(line.len, line.delay)}
          />
        ))}
      </g>

      {/* The core, sized to be the visual anchor rather than one node among many */}
      <g fill="none">
        <rect
          x="286"
          y="88"
          width="124"
          height="64"
          rx="2"
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="bp-line"
          style={vars(380, 0.75)}
        />
        <text
          x="348"
          y="112"
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
          x="348"
          y="132"
          textAnchor="middle"
          className="bp-label"
          style={vars(null, 1.1)}
          fill="var(--fg)"
          opacity="0.62"
          fontSize="8"
          letterSpacing="1.4"
          fontFamily={MONO}
        >
          4-LAYER ENGINE
        </text>
      </g>

      {/* Junctions */}
      <g>
        {NODES.map((node) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className="bp-node"
            fill={node.filled ? "var(--accent)" : "var(--bg)"}
            stroke="var(--accent)"
            strokeWidth="1.5"
            style={vars(null, node.delay)}
          />
        ))}
      </g>

      {/* Annotations */}
      <g
        fill="var(--fg)"
        opacity="0.78"
        fontSize="9"
        letterSpacing="2"
        fontFamily={MONO}
      >
        {LABELS.map((label) => (
          <text
            key={label.text}
            x={label.x}
            y={label.y}
            textAnchor={label.anchor}
            className="bp-label"
            style={vars(null, label.delay)}
          >
            {label.text}
          </text>
        ))}
      </g>

      {/* Dimension line: the detail that makes it read as a real sheet */}
      <g
        stroke="var(--hairline-strong)"
        strokeWidth="1"
        fill="none"
        className="bp-line"
        style={vars(540, 2.05)}
      >
        <path d="M20 282 H540" />
        <path d="M20 277 V287 M540 277 V287" />
      </g>
      <text
        x="280"
        y="277"
        textAnchor="middle"
        className="bp-label"
        style={vars(null, 2.3)}
        fill="var(--fg)"
        opacity="0.6"
        fontSize="8"
        letterSpacing="1.8"
        fontFamily={MONO}
      >
        UNATTENDED, END TO END
      </text>

      {/* Title block, as on an engineering drawing */}
      <g className="bp-label" style={vars(null, 2.45)}>
        <rect
          x="572"
          y="238"
          width="130"
          height="46"
          fill="none"
          stroke="var(--hairline-strong)"
          strokeWidth="1"
        />
        <line
          x1="572"
          y1="258"
          x2="702"
          y2="258"
          stroke="var(--hairline-strong)"
          strokeWidth="1"
        />
        <text
          x="580"
          y="252"
          fill="var(--fg)"
          opacity="0.7"
          fontSize="7.5"
          letterSpacing="1.4"
          fontFamily={MONO}
        >
          STALLWART SYSTEM
        </text>
        <text
          x="580"
          y="272"
          fill="var(--fg)"
          opacity="0.5"
          fontSize="7"
          letterSpacing="1.3"
          fontFamily={MONO}
        >
          REV 01 · SCALE 1:1
        </text>
      </g>
    </svg>
  );
}
