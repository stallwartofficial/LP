// Animated Beams: the four pillars as nodes wired into one core, with gold
// pulses travelling the connectors (see .beam in globals), plus smaller spokes
// and offshoots so it reads as a network, not just an X. Pure SVG + CSS, no deps.
const NODES: { d: string; box: [number, number, number, number]; label: string; delay: number }[] = [
  { d: "M74 64 C 145 92, 150 150, 200 160", box: [20, 50, 108, 28], label: "AI Agents", delay: 0 },
  { d: "M74 256 C 145 228, 150 170, 200 160", box: [18, 242, 112, 28], label: "AI + SaaS", delay: 0.65 },
  { d: "M330 64 C 259 92, 254 150, 204 160", box: [276, 50, 112, 28], label: "Infra & RAG", delay: 1.3 },
  { d: "M330 256 C 259 228, 254 170, 204 160", box: [280, 242, 108, 28], label: "Custom AI", delay: 1.95 },
];

// Short secondary spokes off the core, labelled with the foundations every
// build shares (the cross-cutting layer under the four pillars).
const MINI: {
  d: string;
  dot: [number, number];
  beam?: boolean;
  delay: number;
  label: string;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { d: "M202 118 L202 92", dot: [202, 92], beam: true, delay: 0.4, label: "Security", lx: 202, ly: 80, anchor: "middle" },
  { d: "M244 160 L278 160", dot: [278, 160], delay: 1.1, label: "APIs", lx: 288, ly: 163, anchor: "start" },
  { d: "M160 160 L126 160", dot: [126, 160], beam: true, delay: 1.7, label: "Data", lx: 116, ly: 163, anchor: "end" },
  { d: "M202 202 L202 228", dot: [202, 228], delay: 2.3, label: "Evals", lx: 202, ly: 246, anchor: "middle" },
];

// Tiny offshoots that branch off the main connectors, lightly labelled.
const OFFSHOOT: { d: string; dot: [number, number]; label: string; lx: number; ly: number; anchor: "start" | "middle" | "end" }[] = [
  { d: "M150 96 C 132 102, 124 114, 120 130", dot: [120, 130], label: "Cloud", lx: 110, ly: 126, anchor: "end" },
  { d: "M254 224 C 272 218, 280 206, 284 190", dot: [284, 190], label: "Owned", lx: 292, ly: 192, anchor: "start" },
  { d: "M150 224 C 132 218, 126 206, 122 192", dot: [122, 192], label: "Docs", lx: 112, ly: 195, anchor: "end" },
];

const faint = "color-mix(in oklab, var(--fg) 16%, transparent)";
const fainter = "color-mix(in oklab, var(--fg) 10%, transparent)";
const surface = "color-mix(in oklab, var(--surface) 85%, transparent)";

function Dot({ x, y, r = 2.5 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="var(--accent)" fillOpacity="0.7" />;
}

export function AnimatedBeams() {
  return (
    <svg viewBox="0 0 404 320" className="h-auto w-full" role="img" aria-label="The four pillars, wired into one engineering standard">
      <defs>
        <radialGradient id="beam-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="color-mix(in oklab, var(--accent) 32%, transparent)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* soft glow behind the core */}
      <circle cx="202" cy="160" r="92" fill="url(#beam-core-glow)" />

      {/* offshoots (faint, static) with light labels */}
      {OFFSHOOT.map((o, i) => (
        <g key={`off-${i}`}>
          <path d={o.d} fill="none" stroke={fainter} strokeWidth="1" />
          <Dot x={o.dot[0]} y={o.dot[1]} r={2} />
          <text x={o.lx} y={o.ly} textAnchor={o.anchor} fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="1" fill="color-mix(in oklab, var(--fg) 42%, transparent)">
            {o.label}
          </text>
        </g>
      ))}

      {/* secondary spokes, labelled with the shared foundations */}
      {MINI.map((m, i) => (
        <g key={`mini-${i}`}>
          <path d={m.d} fill="none" stroke={faint} strokeWidth="1.25" />
          {m.beam && (
            <path d={m.d} pathLength={100} fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" className="beam" style={{ animationDelay: `${m.delay}s` }} />
          )}
          <Dot x={m.dot[0]} y={m.dot[1]} />
          <text x={m.lx} y={m.ly} textAnchor={m.anchor} fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="1.2" fill="color-mix(in oklab, var(--fg) 58%, transparent)">
            {m.label}
          </text>
        </g>
      ))}

      {/* main connectors: faint base + travelling beam */}
      {NODES.map((n, i) => (
        <g key={`c-${i}`}>
          <path d={n.d} fill="none" stroke={faint} strokeWidth="1.25" />
          <path d={n.d} pathLength={100} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" className="beam" style={{ animationDelay: `${n.delay}s` }} />
        </g>
      ))}

      {/* pillar nodes */}
      {NODES.map((n, i) => {
        const [x, y, w, h] = n.box;
        return (
          <g key={`box-${i}`}>
            <rect x={x} y={y} width={w} height={h} rx="8" fill={surface} stroke={faint} />
            <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill="color-mix(in oklab, var(--fg) 85%, transparent)">
              {n.label}
            </text>
          </g>
        );
      })}

      {/* the core */}
      <circle cx="202" cy="160" r="34" fill="color-mix(in oklab, var(--surface) 94%, transparent)" stroke="var(--accent)" strokeWidth="1.5" />
      <image href="/images/stallwart-lion-mark.png" x="180" y="138" width="44" height="44" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
