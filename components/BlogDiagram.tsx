// On-brand inline SVG diagrams for blog posts. One per post, keyed by name.
// All use the site's hairline + gold idiom, currentColor-free explicit token
// fills so they theme correctly, a role="img" title/desc for screen readers,
// and scale to the column width. No external assets, no client JS.

const FG = "var(--fg)";
const MUTED = "color-mix(in oklab, var(--fg) 55%, transparent)";
const FAINT = "color-mix(in oklab, var(--fg) 32%, transparent)";
const HAIR = "var(--hairline-strong)";
const GOLD = "var(--accent)";
const GOLDT = "var(--accent-text)";
const SURFACE = "var(--surface)";

// Compact context: when a diagram is used as a card top-panel we render the
// SVG raw, with no outer figure margin, no border, no caption. React context
// (via module-level flag would be wrong under concurrency) is overkill for a
// server-rendered helper, so we thread a `compact` prop through each diagram
// function via the exported entry point below.
type FrameProps = {
  title: string;
  desc: string;
  viewBox: string;
  children: React.ReactNode;
  compact?: boolean;
};

function Frame({ title, desc, viewBox, children, compact }: FrameProps) {
  if (compact) {
    return (
      <svg
        role="img"
        aria-label={title}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        fontFamily="var(--font-mono), monospace"
      >
        <title>{title}</title>
        <desc>{desc}</desc>
        {children}
      </svg>
    );
  }
  return (
    <figure className="my-12 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]/40 p-5 sm:p-7">
      <svg
        role="img"
        aria-label={title}
        viewBox={viewBox}
        className="h-auto w-full"
        fontFamily="var(--font-mono), monospace"
      >
        <title>{title}</title>
        <desc>{desc}</desc>
        {children}
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/45">
        {title}
      </figcaption>
    </figure>
  );
}

const L = (
  x: number,
  y: number,
  text: string,
  opts: {
    fill?: string;
    size?: number;
    anchor?: "start" | "middle" | "end";
    weight?: number;
  } = {}
) => (
  <text
    x={x}
    y={y}
    fill={opts.fill ?? MUTED}
    fontSize={opts.size ?? 12}
    fontWeight={opts.weight ?? 400}
    textAnchor={opts.anchor ?? "start"}
  >
    {text}
  </text>
);

// 1. AI pilots -> production: the 20 / 80 split.
function PilotProduction({ compact }: { compact?: boolean } = {}) {
  const load = ["Validation", "Retries", "Permissions", "Observability", "Audit", "Rollback"];
  return (
    <Frame
      compact={compact}
      title="A pilot proves 20 percent. Production is the other 80."
      desc="A bar split into a small demo segment and a large load-bearing system segment covering validation, retries, permissions, observability, audit, and rollback."
      viewBox="0 0 640 210"
    >
      {L(40, 40, "THE DEMO", { fill: GOLDT, size: 11 })}
      {L(168, 40, "THE SYSTEM THAT ACTUALLY SHIPS", { fill: MUTED, size: 11 })}
      <rect x="40" y="52" width="112" height="46" rx="6" fill={`color-mix(in oklab, ${GOLD} 22%, transparent)`} stroke={GOLD} />
      <rect x="160" y="52" width="440" height="46" rx="6" fill={SURFACE} stroke={HAIR} />
      {L(96, 80, "20%", { fill: GOLDT, size: 15, anchor: "middle", weight: 500 })}
      {L(380, 80, "80%", { fill: FAINT, size: 15, anchor: "middle", weight: 500 })}
      <line x1="156" y1="44" x2="156" y2="150" stroke={GOLD} strokeWidth="1" strokeDasharray="3 3" />
      {L(156, 168, "where most pilots stop", { fill: GOLDT, size: 11, anchor: "middle" })}
      {load.map((t, i) => {
        const x = 172 + (i % 3) * 145;
        const y = 120 + Math.floor(i / 3) * 22;
        return (
          <g key={t}>
            <circle cx={x} cy={y - 4} r="2" fill={GOLD} />
            {L(x + 10, y, t, { fill: MUTED, size: 11 })}
          </g>
        );
      })}
    </Frame>
  );
}

// 2. AI governance: the layered stack with governance as the load-bearing one.
function GovernanceLayers({ compact }: { compact?: boolean } = {}) {
  const layers = [
    { t: "Intelligence", g: false },
    { t: "Orchestration", g: false },
    { t: "Governance", g: true },
    { t: "Production", g: false },
  ];
  const standards = ["SOC 2", "ISO 42001", "EU AI Act"];
  return (
    <Frame
      compact={compact}
      title="Governance is a layer, built in, not bolted on before an audit."
      desc="A four-layer stack (intelligence, orchestration, governance, production) with the governance layer highlighted, beside the standards it answers to."
      viewBox="0 0 640 250"
    >
      {layers.map((l, i) => {
        const y = 30 + i * 48;
        return (
          <g key={l.t}>
            <rect
              x="40"
              y={y}
              width="380"
              height="38"
              rx="7"
              fill={l.g ? `color-mix(in oklab, ${GOLD} 14%, transparent)` : SURFACE}
              stroke={l.g ? GOLD : HAIR}
            />
            {L(60, y + 24, l.t, {
              fill: l.g ? GOLDT : MUTED,
              size: 13,
              weight: l.g ? 500 : 400,
            })}
            {l.g && L(400, y + 24, "audit-ready", { fill: GOLDT, size: 10, anchor: "end" })}
          </g>
        );
      })}
      <line x1="470" y1="40" x2="470" y2="210" stroke={HAIR} strokeDasharray="3 3" />
      {L(500, 40, "ANSWERS TO", { fill: FAINT, size: 10 })}
      {standards.map((s, i) => (
        <g key={s}>
          <rect x="500" y={58 + i * 44} width="110" height="30" rx="15" fill={SURFACE} stroke={HAIR} />
          {L(555, 78 + i * 44, s, { fill: MUTED, size: 12, anchor: "middle" })}
        </g>
      ))}
    </Frame>
  );
}

// 3. AI SDR: research is the constraint the rest of outbound inherits.
function OutboundResearch({ compact }: { compact?: boolean } = {}) {
  const stages = [
    { t: "Research", g: true },
    { t: "Message", g: false },
    { t: "Reply", g: false },
    { t: "Meeting", g: false },
  ];
  return (
    <Frame
      compact={compact}
      title="Outbound is a research problem. Everything downstream inherits it."
      desc="A pipeline of four stages where the first, research, is enlarged and highlighted as the constraint the rest depends on."
      viewBox="0 0 640 170"
    >
      {stages.map((s, i) => {
        const x = 40 + i * 150;
        const big = s.g;
        const w = big ? 150 : 120;
        const h = big ? 64 : 48;
        const y = big ? 44 : 52;
        return (
          <g key={s.t}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="8"
              fill={big ? `color-mix(in oklab, ${GOLD} 16%, transparent)` : SURFACE}
              stroke={big ? GOLD : HAIR}
            />
            {L(x + w / 2, y + h / 2 + 4, s.t, {
              fill: big ? GOLDT : MUTED,
              size: big ? 14 : 12,
              anchor: "middle",
              weight: big ? 500 : 400,
            })}
            {i < stages.length - 1 && L(x + w + 12, 80, "→", { fill: GOLDT, size: 16 })}
          </g>
        );
      })}
      {L(115, 130, "the constraint every good message depends on", {
        fill: MUTED,
        size: 11,
        anchor: "middle",
      })}
    </Frame>
  );
}

// 4. SaaS case study: before (blast) vs after (researched).
function BeforeAfter({ compact }: { compact?: boolean } = {}) {
  return (
    <Frame
      compact={compact}
      title="From a bought-list blast to a researched, booked meeting."
      desc="Two columns. Before: bought list to blast to no reply. After: researched account to personalized outreach to a booked meeting."
      viewBox="0 0 640 220"
    >
      <line x1="320" y1="20" x2="320" y2="200" stroke={HAIR} strokeDasharray="3 3" />
      {L(40, 34, "BEFORE", { fill: FAINT, size: 11, weight: 500 })}
      {L(360, 34, "AFTER", { fill: GOLDT, size: 11, weight: 500 })}
      {[
        { x: 40, g: false, steps: ["Bought list", "Blast the same email", "Silence"] },
        { x: 360, g: true, steps: ["Research each account", "Personalized outreach", "Booked meeting"] },
      ].map((col) =>
        col.steps.map((t, i) => {
          const y = 54 + i * 52;
          const last = i === col.steps.length - 1;
          return (
            <g key={col.x + t}>
              <rect
                x={col.x}
                y={y}
                width="240"
                height="38"
                rx="7"
                fill={col.g && last ? `color-mix(in oklab, ${GOLD} 16%, transparent)` : SURFACE}
                stroke={col.g && last ? GOLD : HAIR}
              />
              {L(col.x + 16, y + 24, t, {
                fill: col.g && last ? GOLDT : col.g ? MUTED : FAINT,
                size: 12,
                weight: col.g && last ? 500 : 400,
              })}
              {!last && L(col.x + 120, y + 50, "↓", { fill: col.g ? GOLDT : FAINT, size: 13, anchor: "middle" })}
            </g>
          );
        })
      )}
    </Frame>
  );
}

// 5. Agency: outbound that stays steady while delivery load spikes.
function AgencyContinuity({ compact }: { compact?: boolean } = {}) {
  return (
    <Frame
      compact={compact}
      title="Automated outbound stays flat when delivery load spikes."
      desc="A time axis showing delivery load spiking, manual outbound dipping at the spike, and automated outbound holding a steady line."
      viewBox="0 0 640 210"
    >
      <line x1="40" y1="170" x2="600" y2="170" stroke={HAIR} />
      {L(40, 190, "TIME", { fill: FAINT, size: 10 })}
      {/* Delivery load wave */}
      <path
        d="M40 150 C 140 150, 160 40, 260 40 S 360 150, 460 150 S 560 60, 600 60"
        fill="none"
        stroke={HAIR}
        strokeWidth="1.5"
      />
      {L(250, 30, "delivery load", { fill: FAINT, size: 11, anchor: "middle" })}
      {/* Manual outbound: dips at the spike */}
      <path
        d="M40 110 C 140 110, 180 165, 260 165 S 360 120, 460 120 S 560 168, 600 168"
        fill="none"
        stroke={FAINT}
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {L(120, 100, "manual outbound", { fill: FAINT, size: 11 })}
      {/* Automated outbound: steady */}
      <path d="M40 90 L 600 90" fill="none" stroke={GOLD} strokeWidth="2" />
      {L(430, 82, "automated outbound", { fill: GOLDT, size: 11 })}
    </Frame>
  );
}

// 6. Small team: one system instead of a stack (and a sales-ops hire).
function SmallTeamStack({ compact }: { compact?: boolean } = {}) {
  const tools = ["Data", "Enrichment", "Sequencer", "CRM sync", "Scheduler", "Inbox"];
  return (
    <Frame
      compact={compact}
      title="One system instead of a stack, and a sales-ops hire."
      desc="A cluster of six disconnected outbound tools collapsing through an arrow into a single system that produces a booked meeting."
      viewBox="0 0 640 230"
    >
      {tools.map((t, i) => {
        const x = 40 + (i % 2) * 130;
        const y = 34 + Math.floor(i / 2) * 58;
        return (
          <g key={t}>
            <rect x={x} y={y} width="120" height="40" rx="7" fill={SURFACE} stroke={HAIR} />
            {L(x + 60, y + 25, t, { fill: FAINT, size: 11, anchor: "middle" })}
          </g>
        );
      })}
      {L(150, 218, "the usual stack", { fill: FAINT, size: 10, anchor: "middle" })}
      {L(360, 118, "→", { fill: GOLDT, size: 22, anchor: "middle" })}
      <rect x="410" y="70" width="180" height="60" rx="10" fill={`color-mix(in oklab, ${GOLD} 14%, transparent)`} stroke={GOLD} />
      {L(500, 105, "One system", { fill: GOLDT, size: 14, anchor: "middle", weight: 500 })}
      {L(500, 155, "↓", { fill: GOLDT, size: 16, anchor: "middle" })}
      <rect x="430" y="172" width="140" height="40" rx="8" fill={SURFACE} stroke={HAIR} />
      {L(500, 197, "Booked meeting", { fill: MUTED, size: 12, anchor: "middle" })}
    </Frame>
  );
}

// 7. Adding AI to a product: the feature is small, the scaffolding ships it.
function AiInProduct({ compact }: { compact?: boolean } = {}) {
  const scaffold = ["Validation", "Evals", "Guardrails", "Fallbacks", "Observability", "Rollback"];
  return (
    <Frame
      compact={compact}
      title="The AI feature is the easy part. The scaffolding is what ships."
      desc="A product frame containing a small highlighted AI feature beside the production scaffolding that surrounds it: validation, evals, guardrails, fallbacks, observability, and rollback."
      viewBox="0 0 640 230"
    >
      <rect x="30" y="26" width="580" height="178" rx="14" fill="none" stroke={HAIR} />
      {L(48, 18, "YOUR PRODUCT", { fill: FAINT, size: 10 })}
      <rect x="56" y="70" width="150" height="90" rx="10" fill={`color-mix(in oklab, ${GOLD} 16%, transparent)`} stroke={GOLD} />
      {L(131, 108, "AI feature", { fill: GOLDT, size: 14, anchor: "middle", weight: 500 })}
      {L(131, 130, "the easy part", { fill: GOLDT, size: 10, anchor: "middle" })}
      {L(240, 60, "WHAT MAKES IT SHIPPABLE", { fill: FAINT, size: 10 })}
      {scaffold.map((t, i) => {
        const x = 240 + (i % 2) * 185;
        const y = 78 + Math.floor(i / 2) * 42;
        return (
          <g key={t}>
            <rect x={x} y={y} width="165" height="30" rx="15" fill={SURFACE} stroke={HAIR} />
            {L(x + 82, y + 20, t, { fill: MUTED, size: 12, anchor: "middle" })}
          </g>
        );
      })}
    </Frame>
  );
}

// 8. AEO vs SEO vs GEO: three endpoints, one page.
function ThreeEndpoints({ compact }: { compact?: boolean } = {}) {
  return (
    <Frame
      compact={compact}
      title="SEO ranks. AEO gets quoted. GEO gets cited."
      desc="A single page in the centre feeding three destinations: a ranked search result, a quoted answer, and a citation in a generated AI answer."
      viewBox="0 0 640 230"
    >
      <rect x="240" y="88" width="160" height="54" rx="10" fill={`color-mix(in oklab, ${GOLD} 14%, transparent)`} stroke={GOLD} />
      {L(320, 112, "ONE PAGE", { fill: GOLDT, size: 12, anchor: "middle", weight: 500 })}
      {L(320, 130, "written for all three", { fill: GOLDT, size: 10, anchor: "middle" })}
      <line x1="240" y1="115" x2="150" y2="60" stroke={HAIR} strokeDasharray="3 3" />
      <line x1="240" y1="115" x2="150" y2="170" stroke={HAIR} strokeDasharray="3 3" />
      <line x1="400" y1="115" x2="500" y2="115" stroke={HAIR} strokeDasharray="3 3" />
      <rect x="30" y="30" width="130" height="60" rx="10" fill={SURFACE} stroke={HAIR} />
      {L(95, 52, "SEO", { fill: GOLDT, size: 11, anchor: "middle", weight: 500 })}
      {L(95, 74, "ranked in search", { fill: MUTED, size: 10, anchor: "middle" })}
      <rect x="30" y="140" width="130" height="60" rx="10" fill={SURFACE} stroke={HAIR} />
      {L(95, 162, "AEO", { fill: GOLDT, size: 11, anchor: "middle", weight: 500 })}
      {L(95, 184, "quoted by answer engines", { fill: MUTED, size: 9, anchor: "middle" })}
      <rect x="480" y="85" width="140" height="60" rx="10" fill={`color-mix(in oklab, ${GOLD} 16%, transparent)`} stroke={GOLD} />
      {L(550, 107, "GEO", { fill: GOLDT, size: 11, anchor: "middle", weight: 500 })}
      {L(550, 129, "cited in AI answers", { fill: GOLDT, size: 9, anchor: "middle" })}
    </Frame>
  );
}

// 9. GEO checklist: what a page ready for AI citation looks like.
function GeoChecklist({ compact }: { compact?: boolean } = {}) {
  const items = [
    "Answer up front",
    "FAQ block + schema",
    "Article + BreadcrumbList JSON-LD",
    "Stable canonical URL",
    "llms.txt at root",
  ];
  return (
    <Frame
      compact={compact}
      title="What a page ready for AI citation looks like."
      desc="A stylised page mock with the elements a language model looks for when selecting a citation: self-contained answer, FAQ block, schema, stable URL, llms.txt."
      viewBox="0 0 640 260"
    >
      <rect x="30" y="24" width="580" height="212" rx="14" fill="none" stroke={HAIR} />
      {L(48, 16, "READY TO BE CITED", { fill: FAINT, size: 10 })}
      <rect x="50" y="46" width="540" height="30" rx="6" fill={SURFACE} stroke={HAIR} />
      {L(64, 66, "The one-sentence answer, in the first paragraph.", { fill: GOLDT, size: 11 })}
      {items.map((t, i) => {
        const x = 50 + (i % 2) * 290;
        const y = 96 + Math.floor(i / 2) * 46;
        return (
          <g key={t}>
            <rect x={x} y={y} width="270" height="34" rx="7" fill={SURFACE} stroke={HAIR} />
            <circle cx={x + 16} cy={y + 17} r="3" fill={GOLD} />
            {L(x + 30, y + 21, t, { fill: MUTED, size: 11 })}
          </g>
        );
      })}
    </Frame>
  );
}

// 10. AI SEO in 2026: the second endpoint that changed the game.
function TwoEndpoints({ compact }: { compact?: boolean } = {}) {
  return (
    <Frame
      compact={compact}
      title="SEO in 2026: one page, two endpoints."
      desc="A single page fanning out to two endpoints: a person clicking through, and an AI answer citing the page inside a generated response."
      viewBox="0 0 640 220"
    >
      <rect x="240" y="80" width="160" height="60" rx="10" fill={`color-mix(in oklab, ${GOLD} 14%, transparent)`} stroke={GOLD} />
      {L(320, 105, "ONE PAGE", { fill: GOLDT, size: 12, anchor: "middle", weight: 500 })}
      {L(320, 125, "built for both", { fill: GOLDT, size: 10, anchor: "middle" })}
      <path d="M 400 100 C 460 100 460 60 520 60" stroke={HAIR} strokeDasharray="3 3" fill="none" />
      <path d="M 400 120 C 460 120 460 160 520 160" stroke={GOLD} strokeDasharray="3 3" fill="none" />
      <rect x="500" y="30" width="120" height="60" rx="10" fill={SURFACE} stroke={HAIR} />
      {L(560, 54, "The click", { fill: MUTED, size: 12, anchor: "middle", weight: 500 })}
      {L(560, 74, "reader lands", { fill: FAINT, size: 10, anchor: "middle" })}
      <rect x="500" y="130" width="120" height="60" rx="10" fill={`color-mix(in oklab, ${GOLD} 18%, transparent)`} stroke={GOLD} />
      {L(560, 154, "The citation", { fill: GOLDT, size: 12, anchor: "middle", weight: 500 })}
      {L(560, 174, "AI answer quotes", { fill: GOLDT, size: 10, anchor: "middle" })}
      {L(30, 30, "OLD ENDPOINT", { fill: FAINT, size: 10 })}
      {L(30, 200, "NEW ENDPOINT", { fill: GOLDT, size: 10 })}
    </Frame>
  );
}

const diagrams: Record<
  string,
  (props?: { compact?: boolean }) => React.ReactElement
> = {
  "pilot-production": PilotProduction,
  "governance-layers": GovernanceLayers,
  "outbound-research": OutboundResearch,
  "before-after": BeforeAfter,
  "agency-continuity": AgencyContinuity,
  "small-team-stack": SmallTeamStack,
  "ai-in-product": AiInProduct,
  "three-endpoints": ThreeEndpoints,
  "geo-checklist": GeoChecklist,
  "two-endpoints": TwoEndpoints,
};

export function BlogDiagram({
  name,
  compact = false,
}: {
  name: string;
  compact?: boolean;
}) {
  const D = diagrams[name];
  return D ? <D compact={compact} /> : null;
}
