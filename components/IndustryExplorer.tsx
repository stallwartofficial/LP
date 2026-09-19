"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

// "AI across your industry": a two-pane explorer. Left = the 14 industries as a
// hover/select index, each with a bespoke gold line icon. Right = a rich, SEO/GEO
// block for the active one: the "In X, we build AI that..." title, service tags,
// a plain-English paragraph, three outcome bullets, a closing line, and a CTA.
// Every industry's copy renders in the DOM (crawlable); state only swaps which
// pane is lit and visible.
type Industry = {
  name: string;
  icon: ReactNode;
  title: string;
  detail: string;
  tags: string[];
  outcomes: string[];
  closer: string;
};

const ic = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
    {d}
  </svg>
);

const INDUSTRIES: Industry[] = [
  {
    name: "Travel & Hospitality",
    icon: ic(<><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7Z" /></>),
    title: "handles bookings, itineraries, and guest questions on its own, day and night.",
    detail: "Guests get instant answers in any language, at any hour, without a bigger front desk. Prices move with demand on their own, and every trip is planned around what each traveller actually wants.",
    tags: ["Concierge agents", "Dynamic pricing", "Itinerary planners", "Review analysis", "Upsell automation", "Multilingual chat"],
    outcomes: ["Answer guests instantly, in any language", "Fill more rooms with demand-based pricing", "Plan trips tailored to each traveller", "Stop losing bookings to slow replies", "Turn every stay into an upsell"],
    closer: "From first search to checkout, the experience runs itself.",
  },
  {
    name: "Real Estate & Construction",
    icon: ic(<><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" /></>),
    title: "reads plans, tracks sites, and turns documents into decisions.",
    detail: "Contracts, drawings, and permits are read and summarised in seconds instead of days. Cameras track site progress automatically, and every lead is scored so your team chases the deals worth chasing.",
    tags: ["Document intelligence", "Site progress vision", "Lead qualifiers", "Valuation models", "Delay alerts", "Bid estimation"],
    outcomes: ["Read contracts and plans in seconds", "Track site progress from camera feeds", "Score and prioritise every lead", "Catch cost overruns before they hit you", "Win more bids with faster estimates"],
    closer: "Less paperwork, tighter sites, and a pipeline that sorts itself.",
  },
  {
    name: "Aerospace",
    icon: ic(<><path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14.5 4.5C16 3 20 3 20 3s0 4-1.5 5.5L12 15l-3-3 6.5-7.5Z" /><circle cx="15" cy="9" r="1" /></>),
    title: "watches complex systems and catches faults before they ground anything.",
    detail: "Sensor data is watched around the clock, so small faults are caught long before they become failures. Engineers find the exact regulation or manual page in one question instead of an afternoon.",
    tags: ["Predictive maintenance", "Compliance search", "Ops copilots", "Anomaly detection", "Parts forecasting", "Inspection vision"],
    outcomes: ["Catch faults before they ground fleets", "Find any regulation in one question", "Cut unplanned downtime", "Stop grounded aircraft draining your revenue", "Keep the right parts on the shelf"],
    closer: "Safety and uptime, backed by systems that never look away.",
  },
  {
    name: "Banking",
    icon: ic(<><path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M3 10l9-6 9 6" /></>),
    title: "moves money safely, catches fraud, and answers customers instantly.",
    detail: "Suspicious activity is flagged in real time, before money leaves. New customers are verified in minutes, and everyday questions are answered instantly without a queue.",
    tags: ["Fraud detection", "KYC automation", "Support agents", "AML monitoring", "Dispute resolution", "Chargeback defense"],
    outcomes: ["Flag fraud in real time, before money leaves", "Verify new customers in minutes", "Answer customers without a queue", "Stop losing money to fraud caught too late", "Resolve disputes without the backlog"],
    closer: "Safer money movement and faster service, at the same time.",
  },
  {
    name: "Retail & E-commerce",
    icon: ic(<><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>),
    title: "personalises every shopper and keeps shelves and prices right.",
    detail: "Every shopper sees the products most likely to suit them, which lifts each basket. Stock is forecast so you rarely sell out or over-order, and your catalogue keeps itself tidy and searchable.",
    tags: ["Recommendation engines", "Demand forecasting", "Catalog automation", "Visual search", "Cart recovery", "Return reduction"],
    outcomes: ["Lift baskets with personal recommendations", "Forecast stock to avoid sell-outs", "Keep the catalogue clean automatically", "Win back the carts shoppers abandon", "Cut the returns eating your margin"],
    closer: "More per shopper, less waste on the shelf.",
  },
  {
    name: "Education",
    icon: ic(<><path d="M22 9 12 5 2 9l10 4 10-4Z" /><path d="M6 11v5c0 1 3 2 6 2s6-1 6-2v-5" /></>),
    title: "tutors each learner and takes the busywork off educators.",
    detail: "Each learner gets a patient tutor that adapts to their pace. Grading and lesson prep happen in the background, so teachers spend their time teaching, not on paperwork.",
    tags: ["Adaptive tutors", "Grading assistants", "Course generation", "Progress analytics", "Dropout alerts", "Parent updates"],
    outcomes: ["Give every learner a personal tutor", "Grade and prep lessons in the background", "Free teachers to teach", "Spot struggling students before they drop out", "Keep parents updated without the emails"],
    closer: "Better outcomes for students, hours back for educators.",
  },
  {
    name: "Fintech",
    icon: ic(<><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 5-6" /></>),
    title: "underwrites, scores, and reconciles faster than any manual team.",
    detail: "Credit decisions come back in seconds with a clear reason attached. Accounts reconcile themselves, and risk is modelled continuously instead of once a quarter.",
    tags: ["Credit scoring", "Reconciliation agents", "Risk models", "Transaction insights", "Default prediction", "Audit trails"],
    outcomes: ["Decide credit in seconds, with reasons", "Reconcile accounts automatically", "Model risk continuously", "Stop bad loans before they default", "Close the books without the month-end scramble"],
    closer: "Faster decisions your compliance team can still defend.",
  },
  {
    name: "Insurtech",
    icon: ic(<><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>),
    title: "reads claims, prices risk, and settles the simple cases itself.",
    detail: "Claims are read, sorted, and the straightforward ones settled without a human touching them. Risk is priced on real data, and policy questions are answered from your own documents.",
    tags: ["Claims triage", "Underwriting copilots", "Policy search", "Fraud checks", "Renewal automation", "Leakage control"],
    outcomes: ["Settle simple claims automatically", "Price risk on real data", "Answer policy questions instantly", "Stop paying out on fraudulent claims", "Keep renewals from quietly slipping away"],
    closer: "Lower loss ratios and claims that close in hours.",
  },
  {
    name: "Media & Advertising",
    icon: ic(<><path d="M3 11v2a1 1 0 0 0 1 1h2l6 4V6L6 10H4a1 1 0 0 0-1 1Z" /><path d="M16 8a5 5 0 0 1 0 8" /></>),
    title: "creates, targets, and measures campaigns at machine speed.",
    detail: "Drafts, variations, and creative are generated in minutes, not weeks. Audiences are matched to the right message, and what works is measured and doubled down on automatically.",
    tags: ["Content generation", "Audience targeting", "Creative testing", "Performance analytics", "Budget optimisation", "Brand safety"],
    outcomes: ["Generate creative in minutes, not weeks", "Match audiences to the right message", "Double down on what works", "Stop burning budget on ads that flop", "Keep your brand off the wrong pages"],
    closer: "More output, sharper targeting, measurable spend.",
  },
  {
    name: "Physical AI",
    icon: ic(<><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>),
    title: "gives machines eyes and judgement in the real world.",
    detail: "Robots and cameras understand what they are looking at and act on it. Quality is inspected at line speed, and machines navigate real spaces safely on their own.",
    tags: ["Robotics perception", "Vision QA", "Autonomy stacks", "Edge inference", "Defect detection", "Safety monitoring"],
    outcomes: ["See and act in the real world", "Inspect quality at line speed", "Navigate spaces safely", "Catch defects before they ship to customers", "Stop costly downtime on the line"],
    closer: "Judgement and vision, built into the machines themselves.",
  },
  {
    name: "Healthcare",
    icon: ic(<path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 3c0 4.5-9.5 12-9.5 12Z" />),
    title: "handles records, triage, and paperwork so clinicians treat people.",
    detail: "Notes and records are written up automatically, giving clinicians their time back. Patients are triaged to the right care faster, and any record is found with a simple question.",
    tags: ["Clinical documentation", "Triage agents", "Records search", "Prior-auth automation", "Scheduling agents", "Coding assistants"],
    outcomes: ["Write clinical notes automatically", "Triage patients to the right care", "Find any record in one question", "Cut the after-hours charting that burns out clinicians", "Fill the gaps left by no-shows"],
    closer: "More time with patients, less time on paperwork.",
  },
  {
    name: "Communication",
    icon: ic(<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z" />),
    title: "routes, drafts, and answers across every channel automatically.",
    detail: "Messages are answered, routed, and drafted across chat, email, and voice without a bigger team. Common requests are resolved on their own, and the hard ones reach the right person instantly.",
    tags: ["Support automation", "Voice agents", "Smart routing", "Sentiment analysis", "Escalation alerts", "Knowledge search"],
    outcomes: ["Answer across chat, email, and voice", "Resolve common requests automatically", "Route the hard ones instantly", "Stop customers waiting on hold and leaving", "Catch angry customers before they churn"],
    closer: "Every channel covered, without growing the team.",
  },
  {
    name: "Automotive",
    icon: ic(<><path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5v5h-3v-2H6v2H3v-5Z" /><circle cx="7.5" cy="15.5" r="1.5" /><circle cx="16.5" cy="15.5" r="1.5" /></>),
    title: "powers assistants, diagnostics, and the software inside the vehicle.",
    detail: "Drivers get a natural assistant that actually understands them. Faults are diagnosed early, and fleets are watched and optimised from a single place.",
    tags: ["In-car assistants", "Diagnostics AI", "Fleet intelligence", "ADAS vision", "Warranty analysis", "Recall detection"],
    outcomes: ["Give drivers a natural assistant", "Diagnose faults early", "Optimise fleets from one place", "Catch defects before they become recalls", "Cut warranty claims eating your profit"],
    closer: "Smarter vehicles and fleets that look after themselves.",
  },
  {
    name: "Mobility",
    icon: ic(<><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6" /></>),
    title: "optimises routes, fleets, and demand in real time.",
    detail: "Routes and dispatch adjust to traffic and demand as it happens. You know where demand will be before it arrives, so vehicles are in the right place at the right time.",
    tags: ["Route optimisation", "Demand prediction", "Dispatch agents", "Pricing engines", "Idle-time reduction", "ETA accuracy"],
    outcomes: ["Adjust routes to live conditions", "Predict demand before it arrives", "Place vehicles where they are needed", "Stop vehicles sitting idle and losing money", "Give riders ETAs they can trust"],
    closer: "Right vehicle, right place, right time, automatically.",
  },
];

export function IndustryExplorer() {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  // Mobile carousel: auto-advance one card every few seconds and loop, while
  // native swipe still works. Touching it pauses the auto-scroll, which then
  // resumes after a pause. Skipped under reduced-motion.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout>;
    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => (paused = false), 4500);
    };
    el.addEventListener("pointerdown", pause);
    el.addEventListener("touchstart", pause, { passive: true });

    const tick = setInterval(() => {
      if (paused) return;
      const first = el.firstElementChild as HTMLElement | null;
      const step = first ? first.offsetWidth + 16 : el.clientWidth;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3500);

    return () => {
      clearInterval(tick);
      clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
    };
  }, []);

  return (
    <section className="section-y rule-t px-[var(--space-gutter)]" id="industries">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">AI across your industry</p>
          <h2 className="font-display mt-3 text-display-sm font-light">
            Wherever you operate, <span className="text-gold-sheen italic">AI fits.</span>
          </h2>
        </Reveal>

        <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          {/* Left: the index, with an icon per industry */}
          <Reveal>
            <ul className="flex flex-col">
              {INDUSTRIES.map((ind, i) => (
                <li key={ind.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`group flex w-full items-center gap-3 border-b border-[var(--hairline)] py-3 text-left transition-[padding,color] duration-300 ease-[var(--ease-out-expo)] ${
                      active === i ? "pl-2 text-[var(--fg)]" : "text-[var(--fg)]/50 hover:pl-1.5 hover:text-[var(--fg)]/80"
                    }`}
                  >
                    <span className={`shrink-0 transition-colors duration-300 ${active === i ? "text-[var(--accent)]" : "text-[var(--fg)]/35"}`}>
                      {ind.icon}
                    </span>
                    <span className="text-[length:var(--text-step-1)] font-light">{ind.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right: the active detail (all render; only active is shown) */}
          <div className="relative lg:sticky lg:top-28 lg:self-start">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={ind.name}
                aria-hidden={active !== i}
                className={`transition-opacity duration-500 ease-[var(--ease-out-expo)] ${
                  active === i ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                  {String(i + 1).padStart(2, "0")} / {ind.name}
                </p>
                <p className="font-display mt-4 text-[length:var(--text-step-3)] font-light leading-[1.15]">
                  In {ind.name.split(" & ")[0].toLowerCase()}, we build AI that {ind.title}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {ind.tags.map((t) => (
                    <li key={t} className="rounded-full border border-[var(--hairline)] px-3 py-1.5 text-xs text-[var(--fg)]/75">
                      {t}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 max-w-[58ch] text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/70">
                  {ind.detail}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {ind.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-[length:var(--text-step-0)] text-[var(--fg)]/85">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {o}
                    </li>
                  ))}
                </ul>

                <p className="font-display mt-6 max-w-[52ch] text-[length:var(--text-step-1)] font-light italic text-[var(--fg)]/90">
                  {ind.closer}
                </p>

                <Link href="/contact" className="link-draw mt-7 inline-block text-sm font-medium text-[var(--accent-text)]">
                  Build for {ind.name.split(" & ")[0].toLowerCase()}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: an auto-scrolling, swipeable card carousel through all
            industries (desktop uses the two-pane explorer above). */}
        <div
          ref={scroller}
          className="-mx-[var(--space-gutter)] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--space-gutter)] px-[var(--space-gutter)] pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] lg:hidden"
        >
          {INDUSTRIES.map((ind, i) => (
            <article
              key={ind.name}
              className="flex w-[82%] shrink-0 snap-start flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--accent)]/40 text-[var(--accent-text)]">
                  {ind.icon}
                </span>
                <h3 className="font-display text-[length:var(--text-step-2)] font-light leading-tight">
                  {ind.name}
                </h3>
              </div>

              <p className="font-display mt-4 text-[length:var(--text-step-1)] font-light leading-snug">
                In {ind.name.split(" & ")[0].toLowerCase()}, we build AI that {ind.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/70">{ind.detail}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {ind.tags.map((t) => (
                  <li key={t} className="rounded-full border border-[var(--hairline)] px-3 py-1.5 text-xs text-[var(--fg)]/75">
                    {t}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="link-draw mt-6 inline-block text-sm font-medium text-[var(--accent-text)]">
                Build for {ind.name.split(" & ")[0].toLowerCase()}
              </Link>
              <span className="mt-3 font-mono text-[10px] tracking-[0.2em] text-[var(--fg)]/35">
                {String(i + 1).padStart(2, "0")} / {String(INDUSTRIES.length).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
