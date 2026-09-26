import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ProofBadge } from "@/components/ProofBadge";

// /offer opening: a big centered headline over a full-width glassmorphism bento
// of the four pillars. Nothing to click and nothing hidden: every pillar shows a
// plain-English explainer, its service tags, and a bespoke gold-line visual, so
// a customer reads the whole offer at a glance. Asymmetric bento (wide/narrow).

type Pillar = {
  n: string;
  span: string;
  title: string;
  lead: string;
  body: string;
  cta: string;
  services: string[];
  visual: ReactNode;
  // Wide cards carry a 3-up strip of mini diagrams to fill the extra height.
  strip?: { label: string; svg: ReactNode }[];
};

// --- bespoke gold-line visuals (no images), tuned to each pillar ---
const stroke = "var(--accent)";
const faint = "color-mix(in oklab, var(--fg) 22%, transparent)";

// AI Agents & Automation: the agent loop across the full width. Perceive ->
// Reason -> Act -> Tools, with an autonomous feedback loop returning Act to
// Perceive. Signals flow along every accent path; the core breathes.
const lbl = { fill: faint, fontSize: 8, textAnchor: "middle" as const, fontFamily: "var(--font-mono)", letterSpacing: "1" };
const AgentsVisual = (
  <svg viewBox="0 0 320 150" fill="none" className="viz-agents h-full w-full" aria-hidden="true">
    {/* forward flow with arrowheads */}
    <path d="M58 56H120" stroke={stroke} strokeOpacity="0.6" />
    <path d="M162 56H222" stroke={stroke} strokeOpacity="0.6" />
    <path d="M120 56l-7-4M120 56l-7 4M222 56l-7-4M222 56l-7 4" stroke={stroke} />
    {/* stage nodes */}
    <circle cx="44" cy="56" r="12" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={stroke} />
    <circle cx="141" cy="56" r="17" fill="color-mix(in oklab,var(--accent) 16%,transparent)" stroke={stroke} />
    <circle cx="141" cy="56" r="4" fill={stroke} />
    <circle cx="238" cy="56" r="12" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={stroke} />
    {/* tools the agent calls */}
    <path d="M250 56h16M266 56c9 0 9-18 22-18M266 56c9 0 9 18 22 18" stroke={stroke} strokeOpacity="0.6" />
    <rect x="288" y="28" width="26" height="20" rx="4" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={faint} />
    <rect x="288" y="64" width="26" height="20" rx="4" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={faint} />
    {/* autonomous feedback loop: Act back to Perceive */}
    <path d="M238 70C238 128 44 128 44 70" stroke={stroke} strokeOpacity="0.5" />
    <path d="M44 72l-4 8M44 72l4 8" stroke={stroke} />
    {/* labels */}
    <text x="44" y="86" {...lbl}>PERCEIVE</text>
    <text x="141" y="92" {...lbl}>REASON</text>
    <text x="238" y="86" {...lbl}>ACT</text>
    <text x="301" y="100" {...lbl}>TOOLS</text>
    <text x="141" y="145" {...lbl} fillOpacity="0.7">AUTONOMOUS LOOP</text>
  </svg>
);

const SaasVisual = (
  <svg viewBox="0 0 320 150" fill="none" className="viz-saas h-full w-full" aria-hidden="true">
    <rect x="30" y="20" width="260" height="115" rx="10" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={faint} />
    <path d="M30 45h260" stroke={faint} />
    <circle cx="45" cy="32" r="3" fill={stroke} /><circle cx="55" cy="32" r="3" fill={faint} /><circle cx="65" cy="32" r="3" fill={faint} />
    <rect x="42" y="58" width="70" height="65" rx="6" fill="none" stroke={faint} />
    <g stroke={stroke} strokeOpacity="0.7"><path d="M52 100l14-16 12 10 16-22" /></g>
    <g fill={faint}><rect x="128" y="58" width="150" height="8" rx="4" /><rect x="128" y="76" width="120" height="8" rx="4" /><rect x="128" y="94" width="140" height="8" rx="4" /><rect x="128" y="112" width="90" height="8" rx="4" /></g>
  </svg>
);

const InfraVisual = (
  <svg viewBox="0 0 320 150" fill="none" className="viz-infra h-full w-full" aria-hidden="true">
    <g stroke={faint}>
      <path d="M160 75h-70M160 75h70M160 75V35M160 75v40" />
      <path d="M90 75H55M230 75h35M160 35V15M160 115v20" stroke={stroke} strokeOpacity="0.6" />
    </g>
    {[[55, 75], [265, 75], [160, 15], [160, 135]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="6" fill="color-mix(in oklab,var(--accent) 20%,transparent)" stroke={stroke} />
    ))}
    <rect x="132" y="55" width="56" height="40" rx="8" fill="color-mix(in oklab,var(--surface) 85%,transparent)" stroke={stroke} />
    <text x="160" y="80" textAnchor="middle" fontSize="13" fill={stroke} fontFamily="var(--font-mono)">RAG</text>
  </svg>
);

// Custom AI Systems: varied requirements on the left assemble into one bespoke
// system in the centre, which ships to production. Signals flow inward, the
// core breathes, the production check draws.
const CustomVisual = (
  <svg viewBox="0 0 320 150" fill="none" className="viz-custom h-full w-full" aria-hidden="true">
    {/* varied requirement modules (different shapes) */}
    <rect className="mod" x="30" y="26" width="26" height="22" rx="4" stroke={faint} />
    <circle className="mod" cx="43" cy="75" r="13" stroke={faint} />
    <path className="mod" d="M30 126 56 126 43 104Z" stroke={faint} />
    {/* connectors into the custom system's left edge */}
    <path className="flow" d="M56 37C88 37 96 60 118 60M56 75H118M50 113C88 113 96 90 118 90" stroke={stroke} strokeOpacity="0.6" />
    {/* the custom system: heterogeneous modules fitted together */}
    <rect className="sys-core" x="120" y="48" width="82" height="54" rx="8" fill="color-mix(in oklab,var(--accent) 12%,transparent)" stroke={stroke} />
    <rect x="127" y="55" width="30" height="18" rx="3" stroke={faint} />
    <rect x="161" y="55" width="34" height="18" rx="3" stroke={faint} />
    <rect x="127" y="77" width="44" height="18" rx="3" stroke={faint} />
    <rect x="175" y="77" width="20" height="18" rx="3" stroke={stroke} strokeOpacity="0.6" />
    {/* ship to production */}
    <path className="flow" d="M202 75H260" stroke={stroke} strokeOpacity="0.6" />
    <path d="M260 75l-7-4M260 75l-7 4" stroke={stroke} />
    <circle cx="286" cy="75" r="15" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={stroke} />
    <path className="sys-check" d="M278 75l6 6 10-12" stroke={stroke} />
    {/* labels */}
    <text x="43" y="146" {...lbl}>REQUIREMENTS</text>
    <text x="161" y="118" {...lbl}>CUSTOM SYSTEM</text>
    <text x="286" y="103" {...lbl}>PRODUCTION</text>
  </svg>
);

// Mini diagrams for the wide cards' right column. Same gold-line idiom, tiny,
// and each one idle-animates (see the .m-* rules in globals.css): the class on
// the svg drives which parts move.
const mini = (cls: string, children: ReactNode) => (
  <svg viewBox="0 0 100 60" fill="none" className={`viz-mini ${cls} h-full w-full`} aria-hidden="true">
    {children}
  </svg>
);
// Web: a globe with a marker travelling the equator.
const MiniBrowser = mini(
  "m-web",
  <>
    <circle cx="50" cy="30" r="19" stroke={faint} />
    <ellipse cx="50" cy="30" rx="8" ry="19" stroke={faint} />
    <path d="M31 30h38" stroke={faint} />
    <path d="M35 20h30M35 40h30" stroke={faint} />
    <circle className="web-dot" cx="31" cy="30" r="2.5" fill={stroke} />
  </>,
);
// Mobile: content lines type in.
const MiniMobile = mini(
  "m-mobile",
  <>
    <rect x="36" y="8" width="28" height="46" rx="5" stroke={faint} />
    <path d="M45 12h10" stroke={faint} />
    <rect x="42" y="20" width="16" height="10" rx="2" stroke={stroke} strokeOpacity="0.6" />
    <path d="M42 36h16M42 42h11" stroke={faint} />
  </>,
);
// API: a data packet travels between the brackets.
const MiniApi = mini(
  "m-api",
  <>
    <path d="M40 20 28 30l12 10M60 20l12 10-12 10" stroke={stroke} strokeOpacity="0.7" />
    <circle className="api-dot" cx="42" cy="30" r="2.5" fill={stroke} />
  </>,
);
// Stores: the cylinder rings fall in one by one.
const MiniDatabase = mini(
  "m-store",
  <>
    <ellipse cx="50" cy="16" rx="20" ry="6" stroke={stroke} strokeOpacity="0.7" />
    <path d="M30 16v12c0 3.3 9 6 20 6s20-2.7 20-6V16" stroke={faint} />
    <path d="M30 28v12c0 3.3 9 6 20 6s20-2.7 20-6V28" stroke={faint} />
  </>,
);
// Vectors: the grid twinkles, the lit vector pulses.
const MiniVectors = mini(
  "m-vec",
  <>
    {[0, 1, 2, 3].map((c) =>
      [0, 1, 2].map((r) => (
        <circle key={`${c}-${r}`} cx={26 + c * 16} cy={16 + r * 14} r="2.5" fill={c === 2 && r === 1 ? stroke : faint} />
      )),
    )}
  </>,
);
// Pipelines: the signal flows along the line.
const MiniPipeline = mini(
  "m-pipe",
  <>
    <circle cx="20" cy="30" r="5" stroke={stroke} />
    <circle cx="50" cy="30" r="5" stroke={faint} />
    <circle cx="80" cy="30" r="5" stroke={faint} />
    <path d="M25 30h20M55 30h20" stroke={stroke} strokeOpacity="0.6" />
  </>,
);
// Dashboards: the bars rise and the trend line draws.
const MiniDashboard = mini(
  "m-dash",
  <>
    <rect x="10" y="12" width="80" height="38" rx="5" stroke={faint} />
    <path d="M10 24h80" stroke={faint} />
    <rect x="18" y="30" width="7" height="14" fill={stroke} fillOpacity="0.5" />
    <rect x="30" y="26" width="7" height="18" fill={stroke} fillOpacity="0.5" />
    <rect x="42" y="34" width="7" height="10" fill={faint} />
    <path d="M58 40l8-8 6 5 10-12" stroke={stroke} strokeOpacity="0.7" />
  </>,
);
// MVP: the launch ring pulses out.
const MiniMvp = mini(
  "m-mvp",
  <>
    <circle cx="50" cy="30" r="16" stroke={stroke} strokeOpacity="0.7" />
    <path d="M45 22l15 8-15 8z" fill={stroke} fillOpacity="0.6" />
  </>,
);
// Monitoring: the trace scrolls across.
const MiniMonitor = mini(
  "m-mon",
  <>
    <rect x="10" y="14" width="80" height="34" rx="5" stroke={faint} />
    <path d="M14 33h13l6-11 8 20 6-13 5 4h29" stroke={stroke} strokeOpacity="0.7" />
  </>,
);

const PILLARS: Pillar[] = [
  {
    n: "01",
    span: "md:col-span-1",
    title: "AI Agents & Automation",
    lead: "Software that does the work for you, on its own.",
    body: "Hand off the work that eats your team's day, the follow-ups, the data entry, the checks, and let software run it end to end. It works nights and weekends, never skips a step, and scales the moment you need more. You get your people back for the work that actually needs a human.",
    cta: "Automate my work",
    services: ["Agentic AI Systems", "AI Development", "AI Strategy & Consulting", "AI Center of Excellence", "Workflow Automation", "Voice & Chat Agents", "Copilots & Assistants", "RPA Modernisation", "Multi-Agent Orchestration"],
    visual: AgentsVisual,
  },
  {
    n: "02",
    span: "md:col-span-2",
    title: "AI + SaaS Products",
    lead: "Full products, built and owned by you.",
    body: "Have an idea for an app or platform? We design, build, and ship the whole thing, front to back, with AI where it earns its place. You launch faster than standing up a team, and you own every line of code, your data, and the roadmap. No lock-in, no staying dependent on us to keep moving. One senior team carries it from the first sketch to a running product, so nothing is lost in a handoff and the thing that ships is the thing you signed off on.",
    cta: "Build my product",
    services: ["SaaS Platforms", "Web Apps", "Mobile Apps", "UX & Product Design", "Custom Software", "Digital Products", "MVP & Prototyping", "Dashboards & Analytics", "API Products"],
    visual: SaasVisual,
    strip: [
      { label: "Web", svg: MiniBrowser },
      { label: "Mobile", svg: MiniMobile },
      { label: "API", svg: MiniApi },
      { label: "Dashboards", svg: MiniDashboard },
      { label: "MVP", svg: MiniMvp },
    ],
  },
  {
    n: "03",
    span: "md:col-span-2",
    title: "AI Infrastructure & RAG",
    lead: "The engine that makes AI reliable.",
    body: "Generic AI guesses. We build the layer that makes it answer from your own documents, data, and rules, so replies are accurate, current, and easy to trace. It stays fast as you grow, keeps your data yours, and turns 'the AI made something up' into a problem you no longer have. Every answer can point back to the source it came from, so your team can trust it, and you can prove where it came from when someone asks.",
    cta: "Make my AI reliable",
    services: ["Enterprise Search & RAG", "AI Infrastructure", "Data Engineering", "API & Integrations", "Vector Databases", "Model Fine-tuning", "MLOps & Monitoring", "Data Pipelines", "Cloud & DevOps"],
    visual: InfraVisual,
    strip: [
      { label: "Stores", svg: MiniDatabase },
      { label: "Vectors", svg: MiniVectors },
      { label: "Pipelines", svg: MiniPipeline },
      { label: "Monitoring", svg: MiniMonitor },
    ],
  },
  {
    n: "04",
    span: "md:col-span-1",
    title: "Custom AI Systems",
    lead: "Anything the rest do not cover, engineered to fit.",
    body: "Got a problem that does not fit any template? Describe it and we build it from scratch, shaped to exactly how you work, not to what some product happened to ship. One senior team, one standard, whatever the software needs to be, taken to production and yours to keep.",
    cta: "Scope my system",
    services: ["Generative AI & LLM Apps", "Enterprise Platforms", "QA Automation & Testing", "Computer Vision", "Predictive Models", "Recommendation Systems", "Document Intelligence", "Legacy AI Integration", "OCR & Data Extraction"],
    visual: CustomVisual,
  },
];

export function ServiceCatalog() {
  return (
    <section className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40" id="services">
      <div className="mx-auto max-w-[112rem]">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-display font-light leading-[1.05]" style={{ fontSize: "var(--text-step-6)" }}>
            What does Stallwart build?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/72">
            AI agents, SaaS products, RAG infrastructure, and custom AI
            systems. If you can describe the problem, we build the system
            that solves it.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex justify-center">
          <ProofBadge inline />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => {
            const isWide = p.span.includes("col-span-2");
            const content = (
              <div className="flex flex-1 flex-col">
                <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-text)]">{p.n}</span>
                <h3 className="font-display mt-3 text-[length:var(--text-step-3)] font-light leading-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-[length:var(--text-step-1)] text-[var(--fg)]/85">{p.lead}</p>

                {/* On wide cards the tags stretch to fill the row width; on
                    narrow cards they stay compact and left-aligned. */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.services.map((s) => (
                    <li
                      key={s}
                      className={`grow rounded-full border border-[var(--hairline)] px-3 py-1.5 text-center text-xs text-[var(--fg)]/75 transition-colors duration-300 hover:border-[var(--accent)]/50 hover:text-[var(--fg)] ${
                        isWide ? "" : "sm:grow-0 sm:text-left"
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/60">
                  {p.body}
                </p>

                {/* Bigger CTA, directly after the paragraph. The underline
                    draws left-to-right on hover. No arrow. */}
                <Link
                  href="/contact"
                  className="group/cta mt-6 inline-block text-[15px] font-medium text-[var(--accent-text)]"
                >
                  <span className="relative pb-1">
                    {p.cta}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-0 bg-[var(--accent)] transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/cta:w-full"
                    />
                  </span>
                </Link>
              </div>
            );

            // Wide right column: the big visual on top, then the mini-diagram
            // grid filling the height beneath it, so the visual + minis form an
            // L against the text column and the card reads as full.
            const rightColumn = p.strip ? (
              <div className="flex shrink-0 flex-col gap-4 lg:w-[42%]">
                <div className="h-[170px] w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                  {p.visual}
                </div>
                <div className="grid flex-1 auto-rows-fr grid-cols-2 gap-3">
                  {p.strip.map((m, i) => (
                    <div
                      key={m.label}
                      className={`mini-tile flex flex-col items-center justify-center gap-2 rounded-xl border border-[var(--hairline)] bg-[var(--surface)]/40 p-3 transition-[transform,border-color,background-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[var(--accent)]/60 hover:bg-[var(--surface)]/70 ${
                        i === p.strip!.length - 1 && p.strip!.length % 2 === 1
                          ? "col-span-2"
                          : ""
                      }`}
                    >
                      <div className="h-[46px] w-full">{m.svg}</div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--fg)]/50">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;

            // Narrow cards keep a single visual pinned to the bottom.
            const narrowVisual = (
              <div className="mt-auto pt-6 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-[130px] w-full">{p.visual}</div>
              </div>
            );

            return (
              <Reveal key={p.title} className={p.span}>
                <article className="glass group card-lift flex h-full flex-col overflow-hidden rounded-2xl p-6 lg:p-8">
                  {isWide ? (
                    <div className="flex h-full flex-col gap-8 lg:flex-row lg:items-stretch">
                      {content}
                      {rightColumn}
                    </div>
                  ) : (
                    <>
                      {content}
                      {narrowVisual}
                    </>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
