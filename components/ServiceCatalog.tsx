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
};

// --- bespoke gold-line visuals (no images), tuned to each pillar ---
const stroke = "var(--accent)";
const faint = "color-mix(in oklab, var(--fg) 22%, transparent)";

const AgentsVisual = (
  <svg viewBox="0 0 320 150" fill="none" className="h-full w-full" aria-hidden="true">
    <g stroke={faint} strokeWidth="1">
      <path d="M60 75h60M200 45h60M200 105h60" />
      <path d="M120 75c30 0 40-30 80-30M120 75c30 0 40 30 80 30" stroke={stroke} strokeOpacity="0.6" />
    </g>
    <circle cx="45" cy="75" r="15" fill="color-mix(in oklab,var(--accent) 18%,transparent)" stroke={stroke} />
    {[[200, 45], [200, 105], [275, 45], [275, 105]].map(([x, y], i) => (
      <rect key={i} x={x - 14} y={y - 12} width="28" height="24" rx="5" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={faint} />
    ))}
    <circle cx="45" cy="75" r="4" fill={stroke} />
  </svg>
);

const SaasVisual = (
  <svg viewBox="0 0 320 150" fill="none" className="h-full w-full" aria-hidden="true">
    <rect x="30" y="20" width="260" height="115" rx="10" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={faint} />
    <path d="M30 45h260" stroke={faint} />
    <circle cx="45" cy="32" r="3" fill={stroke} /><circle cx="55" cy="32" r="3" fill={faint} /><circle cx="65" cy="32" r="3" fill={faint} />
    <rect x="42" y="58" width="70" height="65" rx="6" fill="none" stroke={faint} />
    <g stroke={stroke} strokeOpacity="0.7"><path d="M52 100l14-16 12 10 16-22" /></g>
    <g fill={faint}><rect x="128" y="58" width="150" height="8" rx="4" /><rect x="128" y="76" width="120" height="8" rx="4" /><rect x="128" y="94" width="140" height="8" rx="4" /><rect x="128" y="112" width="90" height="8" rx="4" /></g>
  </svg>
);

const InfraVisual = (
  <svg viewBox="0 0 320 150" fill="none" className="h-full w-full" aria-hidden="true">
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

const CustomVisual = (
  <svg viewBox="0 0 320 150" fill="none" className="h-full w-full" aria-hidden="true">
    <g>
      <rect x="70" y="70" width="80" height="55" rx="8" fill="color-mix(in oklab,var(--surface) 80%,transparent)" stroke={faint} />
      <rect x="120" y="45" width="80" height="55" rx="8" fill="color-mix(in oklab,var(--surface) 85%,transparent)" stroke={faint} />
      <rect x="170" y="20" width="80" height="55" rx="8" fill="color-mix(in oklab,var(--accent) 12%,transparent)" stroke={stroke} />
    </g>
    <path d="M185 47h50M185 60h34" stroke={stroke} strokeOpacity="0.7" />
  </svg>
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
    body: "Have an idea for an app or platform? We design, build, and ship the whole thing, front to back, with AI where it earns its place. You launch faster than standing up a team, and you own every line of code, your data, and the roadmap. No lock-in, no staying dependent on us to keep moving.",
    cta: "Build my product",
    services: ["SaaS Platforms", "Web Apps", "Mobile Apps", "UX & Product Design", "Custom Software", "Digital Products", "MVP & Prototyping", "Dashboards & Analytics", "API Products"],
    visual: SaasVisual,
  },
  {
    n: "03",
    span: "md:col-span-2",
    title: "AI Infrastructure & RAG",
    lead: "The engine that makes AI reliable.",
    body: "Generic AI guesses. We build the layer that makes it answer from your own documents, data, and rules, so replies are accurate, current, and easy to trace. It stays fast as you grow, keeps your data yours, and turns 'the AI made something up' into a problem you no longer have.",
    cta: "Make my AI reliable",
    services: ["Enterprise Search & RAG", "AI Infrastructure", "Data Engineering", "API & Integrations", "Vector Databases", "Model Fine-tuning", "MLOps & Monitoring", "Data Pipelines", "Cloud & DevOps"],
    visual: InfraVisual,
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
            Anything in software, powered by AI.<br />
            <span className="text-gold-sheen italic">If you can describe it, we build it.</span>
          </h2>
        </Reveal>

        <Reveal className="mt-8 flex justify-center">
          <ProofBadge inline />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => {
            const isWide = p.span.includes("col-span-2");
            const content = (
              <div className={isWide ? "lg:flex-1" : "flex flex-1 flex-col"}>
                <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-text)]">{p.n}</span>
                <h3 className="font-display mt-3 text-[length:var(--text-step-3)] font-light leading-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-[length:var(--text-step-1)] text-[var(--fg)]/85">{p.lead}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.services.map((s) => (
                    <li key={s} className="grow rounded-full border border-[var(--hairline)] px-3 py-1.5 text-center text-xs text-[var(--fg)]/75 transition-colors duration-300 hover:border-[var(--accent)]/50 hover:text-[var(--fg)] sm:grow-0 sm:text-left">
                      {s}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/60">
                  {p.body}
                </p>

                <Link
                  href="/contact"
                  className="link-draw mt-5 inline-block text-sm font-medium text-[var(--accent-text)]"
                >
                  {p.cta}
                </Link>
              </div>
            );
            const visual = (
              <div
                className={
                  isWide
                    ? "shrink-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100 lg:w-[38%]"
                    : "mt-auto pt-6 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                }
              >
                <div className={isWide ? "h-[200px] w-full" : "h-[130px] w-full"}>{p.visual}</div>
              </div>
            );
            return (
              <Reveal key={p.title} className={p.span}>
                <article className="glass group card-lift flex h-full flex-col overflow-hidden rounded-2xl p-6 lg:p-8">
                  {isWide ? (
                    <div className="flex h-full flex-col gap-8 lg:flex-row lg:items-center">
                      {content}
                      {visual}
                    </div>
                  ) : (
                    <>
                      {content}
                      {visual}
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
