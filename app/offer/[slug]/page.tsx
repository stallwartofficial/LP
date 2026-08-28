import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { offerings, getOffering } from "@/data/offerings";
import { blogPosts } from "@/data/blog";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { StatusPill } from "@/components/Offerings";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { UsagePricing } from "@/components/UsagePricing";
import { HowItWorksMap } from "@/components/HowItWorksMap";
import { breadcrumbSchema, offeringSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Line-work marks for the "further reading" cards, in the site's hairline + gold
// idiom (currentColor, so they inherit the theme) rather than a raster icon set.
const ArticleMark = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4" />
    <path d="M9 12h6M9 15.5h6M9 8.5h2.5" />
  </svg>
);

const CaseStudyMark = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M4 20h16" />
    <path d="M7 20v-6M12 20V6M17 20v-9" />
  </svg>
);

const JournalMark = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M5 5h14v14H5z" />
    <path d="M9 5v14M12.5 9.5h3.5M12.5 13h3.5" />
  </svg>
);

// --- Persona marks for "Built for". A small line-icon library, so each
// audience gets an icon in the site's hairline + gold idiom.
const personaIcons = {
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
    </>
  ),
  graph: (
    <>
      <path d="M4 19h16" />
      <path d="M5 15l4-4 3 2 5-6" />
      <path d="M17 7h2v2" />
    </>
  ),
  building: (
    <>
      <path d="M5 21V5l7-2v18M12 21V9l6 2v10M4 21h16" />
      <path d="M8 8v0M8 12v0M8 16v0M15 13v0M15 17v0" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="2.5" />
      <path d="M4 20a5 5 0 0 1 10 0" />
      <path d="M16 6.5a2.3 2.3 0 0 1 0 4.4M17 14.5a5 5 0 0 1 3 5.5" />
    </>
  ),
  gears: (
    <>
      <circle cx="10" cy="10" r="3" />
      <path d="M10 4v2M10 14v2M4 10h2M14 10h2M6 6l1.4 1.4M14 14l0 0M13.6 6.4 12.2 7.8M6.4 13.6 7.8 12.2" />
      <path d="M17 15.5a2 2 0 1 0 2.8 2.8" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 21 8 12 13 3 8z" />
      <path d="M3 12l9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="3.5" />
      <path d="M10.6 10.6 20 20M16.5 16.5 19 14M13.5 13.5 16 11" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z" />
      <path d="M9 11.5l2 2 4-4" />
    </>
  ),
  checklist: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="1.5" />
      <path d="M9 9l1.4 1.4L13 8M9 15l1.4 1.4L13 14M15.5 9.2h0.01M15.5 15.2h0.01" />
    </>
  ),
} as const;

const PersonaIcon = ({ name }: { name: keyof typeof personaIcons }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-9 w-9"
  >
    {personaIcons[name]}
  </svg>
);

// --- Surfaces as a hub-and-spoke orbit: the product core at the centre, each
// integration a labelled node around it, connectors drawing in on scroll and
// the core pulsing. Long category labels sit in pills so they stay readable.
// Decorative geometry is aria-hidden; the pill labels are real text, and a
// plain list carries the same content on small screens.
function SurfaceOrbit({ items }: { items: string[] }) {
  const W = 660;
  const H = 560;
  const cx = W / 2;
  const cy = H / 2;
  const rx = 272;
  const ry = 210;
  const cycle = 3.2; // seconds for one signal to travel core -> node
  // Half-step offset off top dead-centre, so no node points straight up into
  // the floating nav (or straight down into the section edge), for any count.
  const pts = items.map((label, i) => {
    const ang =
      (-90 + 180 / items.length + i * (360 / items.length)) * (Math.PI / 180);
    return { label, x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang) };
  });

  return (
    <div className="relative mx-auto hidden h-[560px] w-full max-w-[660px] sm:block">
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
      >
        <g stroke="var(--hairline-strong)" strokeWidth="1.25">
          {pts.map((p, i) => (
            <line
              key={i}
              className="check-draw"
              style={
                { "--len": Math.hypot(p.x - cx, p.y - cy) } as React.CSSProperties
              }
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
            />
          ))}
        </g>

        {/* Core: a soft pulsing ring around a solid gold node. */}
        <circle
          cx={cx}
          cy={cy}
          r="34"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.4"
          className="animate-soft-pulse"
        />
        <circle
          cx={cx}
          cy={cy}
          r="22"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <circle cx={cx} cy={cy} r="4.5" fill="var(--accent)" />

        {/* Signals: a gold light that travels from the core out to each node,
            staggered so they emanate around the hub in turn. */}
        {pts.map((p, i) => {
          const begin = `${((i * cycle) / items.length).toFixed(2)}s`;
          return (
            <circle
              key={i}
              r="4"
              className="orbit-signal"
              fill="var(--accent)"
              style={{ filter: "drop-shadow(0 0 5px var(--accent))" }}
            >
              <animateMotion
                dur={`${cycle}s`}
                begin={begin}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
                path={`M ${cx} ${cy} L ${p.x} ${p.y}`}
              />
              <animate
                attributeName="opacity"
                dur={`${cycle}s`}
                begin={begin}
                repeatCount="indefinite"
                values="0;1;1;0"
                keyTimes="0;0.15;0.75;1"
              />
            </circle>
          );
        })}
      </svg>

      {pts.map((p, i) => (
        <span
          key={i}
          style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
          className="group absolute max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--hairline-strong)] bg-[var(--surface)] px-3.5 py-2 text-center font-mono text-[9.5px] font-medium uppercase leading-[1.5] tracking-[0.12em] text-[var(--fg)]/70 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:border-[var(--accent)]/70 hover:text-[var(--fg)]"
        >
          {items[i]}
        </span>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return offerings.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) return {};
  return {
    title: offering.name,
    description: offering.summary,
    alternates: { canonical: `/offer/${offering.slug}` },
    openGraph: {
      title: `${offering.name}, by ${site.company}`,
      description: offering.summary,
    },
  };
}

// One offering, in depth. The only level of the site where a single product or
// service is the subject.
export default async function OfferingPage({ params }: Props) {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) notFound();

  const inDevelopment = offering.status === "in-development";
  // Related reading, so every offering page links into the content built to
  // rank for its query cluster.
  const related = blogPosts
    .filter((p) => p.offering === offering.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        schema={[
          offeringSchema(offering),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "What We Offer", path: "/offer" },
            { name: offering.name, path: `/offer/${offering.slug}` },
          ]),
        ]}
      />

      {/* ---- Header: pitch on the left, a compact action card on the right so
          a ready buyer can act without scrolling the whole page. ---- */}
      <header className="px-[var(--space-gutter)] pb-4 pt-24 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/offer"
            className="link-draw text-sm text-[var(--accent-text)]"
          >
            ← Everything we build
          </Link>

          <div className="mt-7 flex flex-col gap-y-6 lg:grid lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-x-12 lg:gap-y-10 lg:items-start">
            {/* Left: the pitch. `contents` on mobile so the action card slots
                between the intro/quote and the deeper paragraph/map. */}
            <div className="contents lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col">
              {/* Intro + quote: above the card on every breakpoint. */}
              <div className="order-1 lg:order-none">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow">{offering.category}</span>
                  <StatusPill status={offering.status} />
                </div>

                <h1 className="font-display mt-5 text-display-lg font-light">
                  {offering.name}
                </h1>
                <p className="mt-4 max-w-2xl text-[length:var(--text-step-2)] font-light text-[var(--fg)]/60">
                  {offering.tagline}
                </p>

                {/* The problem, the one-line hook, stays above the card. */}
                <p className="mt-8 max-w-2xl border-l-2 border-[var(--accent)] pl-5 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/85">
                  {offering.problem}
                </p>
              </div>

              {/* The deeper read: after the card on mobile. */}
              <div className="order-3 lg:order-none">
              {!offering.howItWorks && (
                <p className="max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75 lg:mt-7">
                  {offering.description}
                </p>
              )}

              {inDevelopment && (
                <p className="mt-6 max-w-2xl rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-6 text-sm text-[var(--fg)]/75 lg:mt-9">
                  <strong className="font-medium text-[var(--fg)]">
                    This offering is still being built.
                  </strong>{" "}
                  It is not available yet, and we would rather say so than
                  describe something that does not exist. If it is relevant to
                  your team, book a call and we will tell you honestly where it
                  stands.
                </p>
              )}

              {/* How-it-works map, filling the space beneath the intro. */}
              {offering.howItWorks && (
                <div className="mt-6 lg:mt-10">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-[var(--accent)]"
                    />
                    <p className="eyebrow">How it works</p>
                  </div>
                  <h2 className="font-display mt-3 text-display-sm font-light">
                    Put your entire GTM{" "}
                    <span className="text-gold-sheen italic">on autopilot.</span>
                  </h2>
                  <HowItWorksMap steps={offering.howItWorks.steps} />
                </div>
              )}
              </div>
            </div>

            {/* Right: sticky glass action card. Between intro/quote and the
                deeper read on mobile (order-2); right column on desktop. */}
            <aside className="order-2 relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]/55 p-5 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6 lg:order-none lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24">
              {/* Frosted-glass touches: a lit top edge and a soft gold sheen. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--hairline-strong),transparent)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_55%)]"
              />

              <div className="relative">
                <p className="eyebrow">
                  {inDevelopment ? "Early access" : "Get started"}
                </p>

                {offering.usagePricing && !inDevelopment ? (
                  <div className="mt-4 border-t border-[var(--hairline)] pt-4">
                    <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                      Pricing
                    </span>
                    <UsagePricing />
                  </div>
                ) : (
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2 border-t border-[var(--hairline)] pt-4 text-sm text-[var(--fg)]/80">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                      {inDevelopment ? "Status" : "Pricing"}
                    </span>
                    <span>
                      {inDevelopment
                        ? "Not available yet. Book a call and we will tell you honestly where it stands."
                        : offering.pricingShort ?? offering.pricing}
                    </span>
                  </p>
                )}

                {offering.builds && offering.builds.length > 0 && (
                  <div className="mt-5 border-t border-[var(--hairline)] pt-4">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                      What we build
                    </span>
                    <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
                      {offering.builds.map((b) => (
                        <li
                          key={b}
                          className="cursor-default whitespace-nowrap rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)]/40 px-2.5 py-1 text-[11px] text-[var(--fg)]/75 transition-colors duration-300 hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/[0.08] hover:text-[var(--fg)]"
                        >
                          {b}
                        </li>
                      ))}
                      {/* Signals the list is illustrative, not exhaustive. */}
                      <li className="whitespace-nowrap rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--accent-text)]">
                        and more
                      </li>
                    </ul>
                  </div>
                )}

                {/* Products (no build list) surface audiences, and "what it
                    does" unless a full How-it-works map already tells that. */}
                {!offering.builds &&
                  (offering.capabilities.length > 0 ||
                    offering.builtFor.length > 0) && (
                  <>
                    {!offering.howItWorks &&
                      offering.capabilities.length > 0 && (
                    <div className="mt-5 border-t border-[var(--hairline)] pt-4">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                        What it does
                      </span>
                      {(() => {
                        const steps =
                          offering.motion ??
                          offering.capabilities.map((c) => c.eyebrow);
                        const hasOutcome = Boolean(offering.motion);
                        // Pivot = last chip that stays on the top line; the drop
                        // hangs beneath it so the flow turns down there.
                        const pivotIdx = Math.max(
                          1,
                          Math.ceil(steps.length / 2) - 1
                        );
                        const lead = steps.slice(0, pivotIdx);
                        const pivot = steps[pivotIdx];
                        const drop = steps.slice(pivotIdx + 1);
                        const chip = (label: string, accent: boolean) => (
                          <span
                            key={label}
                            className={
                              accent
                                ? "whitespace-nowrap rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--accent-text)]"
                                : "whitespace-nowrap rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)]/40 px-2.5 py-1 text-[11px] text-[var(--fg)]/80 transition-colors duration-300 hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/[0.08] hover:text-[var(--fg)]"
                            }
                          >
                            {label}
                          </span>
                        );
                        const arrow = (k: string) => (
                          <span
                            key={k}
                            aria-hidden="true"
                            className="text-xs text-[var(--accent-text)]/50"
                          >
                            →
                          </span>
                        );
                        const top = [...lead, pivot];
                        return (
                          <div className="mt-3 space-y-1">
                            {/* Line 1 ends with the flow turning down off the
                                last step, so the drop reads from there. */}
                            <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                              {top.flatMap((label, i) =>
                                i === 0
                                  ? [chip(label, false)]
                                  : [arrow(`t-${i}`), chip(label, false)]
                              )}
                              {drop.length > 0 && (
                                <span
                                  aria-hidden="true"
                                  className="ml-0.5 shrink-0 text-[var(--accent-text)]/70"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M12 4v13" />
                                    <path d="M7 12l5 5 5-5" />
                                  </svg>
                                </span>
                              )}
                            </div>
                            {drop.length > 0 && (
                              <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                {drop.flatMap((label, i) => {
                                  const gi = pivotIdx + 1 + i;
                                  const acc =
                                    hasOutcome && gi === steps.length - 1;
                                  return i === 0
                                    ? [chip(label, acc)]
                                    : [arrow(`d-${i}`), chip(label, acc)];
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                      <p className="mt-3 text-[11px] italic leading-snug text-[var(--fg)]/50">
                        Your whole GTM on autopilot. You just show up to the
                        meeting.
                      </p>
                    </div>
                    )}

                    {offering.builtFor.length > 0 && (
                      <div className="mt-5 border-t border-[var(--hairline)] pt-4">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                          Built for
                        </span>
                        <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
                          {offering.builtFor.map((b) => (
                            <li
                              key={b.role}
                              className="whitespace-nowrap rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)]/40 px-2.5 py-1 text-[11px] text-[var(--fg)]/80 transition-colors duration-300 hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/[0.08] hover:text-[var(--fg)]"
                            >
                              {b.role}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                <Link
                  href="/contact"
                  className="btn-wipe mt-6 block rounded-full bg-[var(--fg)] px-7 py-3.5 text-center text-sm font-medium text-[var(--bg)]"
                >
                  {offering.usagePricing ? "Try it now →" : site.cta.primary}
                </Link>
                <Link
                  href="/offer"
                  className="group mt-3 flex items-center justify-center gap-2 rounded-full border border-[var(--hairline-strong)] px-7 py-3.5 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
                >
                  See other products
                  <span
                    aria-hidden="true"
                    className="arrow-shift text-[var(--accent-text)]"
                  >
                    →
                  </span>
                </Link>
              </div>
            </aside>
          </div>

        </div>
      </header>

      {/* ---- Built for. Only for the build-anything offering; products show
          their audiences inside the action card instead, so this standalone
          section would just repeat them. ---- */}
      {offering.builds && (
        <section
          aria-labelledby="built-for"
          className="section-y px-[var(--space-gutter)]"
        >
          <div className="mx-auto max-w-6xl">
          <p className="eyebrow" id="built-for">
            Built for
          </p>
          {/* Mobile: two small cards per row; a lone final card (odd count)
              spans full width with a larger icon. Desktop: three across. */}
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[var(--hairline)] sm:grid-cols-3">
            {offering.builtFor.map((b, i) => {
              const wide =
                i === offering.builtFor.length - 1 &&
                offering.builtFor.length % 2 === 1;
              return (
              <Reveal
                as="div"
                index={i}
                key={b.role}
                className={`group relative overflow-hidden bg-[var(--bg)] p-5 transition-colors duration-300 hover:bg-[var(--surface)] sm:p-6 ${
                  wide ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                {/* Faint gold watermark numeral behind the content. Flat fill
                    and kept fully inside the cell so it never clips. */}
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute right-4 top-3 text-[4.25rem] font-light leading-none text-[var(--accent)] opacity-[0.12] transition-opacity duration-300 group-hover:opacity-[0.2]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`relative block text-[var(--accent-text)] transition-transform duration-300 group-hover:-translate-y-0.5 ${
                    wide
                      ? "[&>svg]:h-12 [&>svg]:w-12 sm:[&>svg]:h-9 sm:[&>svg]:w-9"
                      : ""
                  }`}
                >
                  <PersonaIcon name={b.icon as keyof typeof personaIcons} />
                </span>
                <h3 className="font-display relative mt-4 text-[length:var(--text-step-1)] font-light leading-tight">
                  {b.role}
                </h3>
                <p className="relative mt-1.5 text-sm leading-snug text-[var(--fg)]/60">
                  {b.note}
                </p>
              </Reveal>
              );
            })}
          </div>
          </div>
        </section>
      )}

      {/* ---- How it works (grid). Offerings with a rich map render it in the
          hero instead, so this section is for the rest. ---- */}
      {!offering.howItWorks && offering.capabilities.length > 0 && (
        <section
          aria-labelledby="capabilities"
          className="section-y rule-t bg-[var(--surface)] px-[var(--space-gutter)]"
        >
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">Mechanism</p>
            <h2
              id="capabilities"
              className="font-display mt-3 text-display-sm font-light"
            >
              {inDevelopment ? "What it will do" : "How it works"}
            </h2>

            <ol className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-10 sm:gap-x-14 sm:gap-y-10">
              {offering.capabilities.map((c, i) => (
                <Reveal
                  as="li"
                  index={i}
                  key={c.title}
                  className="group border-t border-[var(--hairline)] pt-4 transition-colors duration-300 hover:border-[var(--accent)]/50 sm:pt-5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)] sm:text-[11px] sm:tracking-[0.22em]">
                    {c.eyebrow}
                  </span>
                  <h3 className="font-display mt-2 text-[length:var(--text-step-1)] font-light leading-tight transition-colors duration-300 group-hover:text-[var(--accent-text)] sm:mt-3 sm:text-[length:var(--text-step-2)]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--fg)]/70 sm:mt-2.5 sm:text-sm">
                    {c.description}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ---- Integrations ---- */}
      {offering.integrations.length > 0 && (
        <section
          aria-labelledby="integrations"
          className="section-y rule-t px-[var(--space-gutter)]"
        >
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">Surfaces</p>
            <h2
              id="integrations"
              className="font-display mt-3 text-display-sm font-light"
            >
              Plugs into what you already use
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[var(--fg)]/60">
              No rip and replace. It runs on what you already operate.
            </p>

            {/* Desktop: the product core at the centre, your stack orbiting it. */}
            <div className="mt-8">
              <SurfaceOrbit items={offering.integrations} />
            </div>

            {/* Mobile: the same surfaces as a plain, tappable list. */}
            <ul className="mt-6 grid gap-x-10 gap-y-1 sm:hidden">
              {offering.integrations.map((integration) => (
                <li
                  key={integration}
                  className="flex items-baseline gap-3 border-b border-[var(--hairline)] py-3.5 text-sm text-[var(--fg)]/85"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-text)]"
                  >
                    <path d="M7 8V6a3 3 0 0 1 6 0v2" />
                    <rect x="4" y="8" width="12" height="7" rx="1.5" />
                    <path d="M16 11h4" />
                  </svg>
                  {integration}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---- FAQ (AEO surface): the shared spec-sheet ledger ---- */}
      {offering.faqs.length > 0 && (
        <Faq heading={`${offering.name}, answered`} items={offering.faqs} />
      )}

      {/* ---- Related reading ---- */}
      {related.length > 0 && (
        <section
          aria-labelledby="related"
          className="section-y rule-t px-[var(--space-gutter)]"
        >
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">Further reading</p>
            <h2
              id="related"
              className="font-display mt-3 text-display-sm font-light"
            >
              {offering.name} in practice
            </h2>

            {/* Two-up cards plus a journal companion card, so a single related
                post is never a stranded card in a wide empty row. */}
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
              {related.map((post, i) => {
                const isCase = post.kind === "case-study";
                return (
                  <Reveal as="li" index={i} key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="card-lift group flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-4 transition-colors duration-300 hover:border-[var(--accent)]/40 sm:p-6"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-[var(--accent-text)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--accent)]/60 sm:h-10 sm:w-10">
                          {isCase ? <CaseStudyMark /> : <ArticleMark />}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--accent-text)] sm:text-[10px] sm:tracking-[0.14em]">
                          {isCase ? "Case study" : "Article"}
                        </span>
                      </div>
                      <h3 className="font-display mt-4 text-[length:var(--text-step-0)] leading-tight transition-colors group-hover:text-[var(--accent-text)] sm:mt-5 sm:text-[length:var(--text-step-1)]">
                        {post.title}
                      </h3>
                      <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-[var(--fg)]/70 sm:line-clamp-2 sm:block">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--fg)]/55 sm:mt-5 sm:text-[10px] sm:tracking-[0.14em]">
                        <span>{post.readingMinutes}m read</span>
                        <span
                          aria-hidden="true"
                          className="arrow-shift text-[var(--accent-text)]"
                        >
                          →
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}

              {/* Journal companion, always last. */}
              <Reveal as="li" index={related.length}>
                <Link
                  href="/blog"
                  className="card-lift group flex h-full flex-col justify-between rounded-2xl border border-dashed border-[var(--hairline-strong)] p-4 transition-colors duration-300 hover:border-[var(--accent)]/50 sm:p-6"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-[var(--accent-text)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--accent)]/60 sm:h-10 sm:w-10">
                    <JournalMark />
                  </span>
                  <div className="mt-4 sm:mt-5">
                    <h3 className="font-display text-[length:var(--text-step-0)] leading-tight sm:text-[length:var(--text-step-1)]">
                      More in the journal
                    </h3>
                    <p className="mt-2 hidden text-sm leading-relaxed text-[var(--fg)]/60 sm:block">
                      Case studies and notes from the work.
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--accent-text)] sm:mt-5 sm:text-[10px] sm:tracking-[0.14em]">
                    Browse all
                    <span aria-hidden="true" className="arrow-shift">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            </ul>
          </div>
        </section>
      )}

    </>
  );
}
