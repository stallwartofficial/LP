"use client";

import { useRef, useState } from "react";

// "Plugs into what you already use" as a broad, centered isometric stack.
//
// Each surface you already run is a floating glass layer; the top one is lit in
// gold. Dotted leaders fan out evenly from the stack to labels on the right, so
// the connections read as deliberate rather than a mismatched column. Hovering a
// layer or its label lifts and brightens the pair and warms its leader. The
// scene bobs gently unless prefers-reduced-motion is set. On-brand line icons,
// no third-party logos — we never imply a named integration we don't have.
//
// Desktop only; on small screens the offer page renders the plain tappable list.

type Icon = { test: RegExp; node: React.ReactNode };

const ICONS: Icon[] = [
  {
    test: /cloud/i,
    node: (
      <path d="M7 18h9a4 4 0 0 0 .6-7.95A6 6 0 0 0 5.8 9.6 3.6 3.6 0 0 0 7 18z" />
    ),
  },
  {
    test: /data|warehouse|storage/i,
    node: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
        <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
      </>
    ),
  },
  {
    test: /api|service|integration/i,
    node: (
      <>
        <path d="M8 4H7a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1" />
        <path d="M16 4h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-1" />
      </>
    ),
  },
  {
    test: /identity|access|auth|security/i,
    node: <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />,
  },
  {
    test: /ci|observ|monitor|logging/i,
    node: <path d="M3 12h4l2.5 6 4-13 2.5 7H21" />,
  },
  {
    test: /premise|residency|server|infra/i,
    node: (
      <>
        <rect x="4" y="4" width="16" height="7" rx="1.5" />
        <rect x="4" y="13" width="16" height="7" rx="1.5" />
        <path d="M7.5 7.5h.01M7.5 16.5h.01" />
      </>
    ),
  },
];

const FALLBACK: React.ReactNode = (
  <>
    <path d="M9 3v4M15 3v4" />
    <path d="M7 7h10v3a5 5 0 0 1-10 0z" />
    <path d="M12 15v6" />
  </>
);

function iconFor(label: string) {
  return ICONS.find((i) => i.test.test(label))?.node ?? FALLBACK;
}

function LayerIcon({ label }: { label: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-11 w-11"
    >
      {iconFor(label)}
    </svg>
  );
}

const W = 860;
const H = 500;
const GAP = 46; // vertical separation between layers, in the 3D space
const ANCHOR = { x: 384, y: 150 }; // stack's measured visual centre, where leaders fan from
const LABEL_X = 566; // left edge of the label column

export function IntegrationStack({ items }: { items: string[] }) {
  const layers = items;
  const n = layers.length;
  const [hi, setHi] = useState<number | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const labelY = (i: number) => 74 + (i * (H - 148)) / Math.max(1, n - 1);

  return (
    <div className="relative mx-auto mt-6 hidden h-[500px] w-full max-w-[860px] sm:block">
      <div className="animate-stack-float absolute inset-0">
        {/* Fan leaders from the stack out to each label. */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {layers.map((_, i) => {
            const on = hi === i;
            return (
              <line
                key={i}
                x1={ANCHOR.x}
                y1={ANCHOR.y}
                x2={LABEL_X - 16}
                y2={labelY(i)}
                stroke={on ? "var(--accent)" : "var(--fg)"}
                strokeOpacity={on ? 0.9 : 0.28}
                strokeWidth={on ? 1.4 : 1}
                strokeDasharray="1 7"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* The stack, centered in the left ~58% of the field. Hover is driven by
            pointer height (top of the stack = first layer, bottom = last), so the
            overlapping layers can never flicker or fight over the pointer. */}
        <div
          className="absolute left-0 top-0 grid h-full w-[58%] place-items-center"
          onMouseMove={(e) => {
            // Pick the layer whose actual on-screen centre is nearest the
            // pointer, so the mapping is exact regardless of the 3D projection.
            let best = 0;
            let bestD = Infinity;
            panelRefs.current.forEach((el, idx) => {
              if (!el) return;
              const r = el.getBoundingClientRect();
              const d = Math.abs(e.clientY - (r.top + r.height / 2));
              if (d < bestD) {
                bestD = d;
                best = idx;
              }
            });
            setHi(best);
          }}
          onMouseLeave={() => setHi(null)}
        >
          <div style={{ perspective: "1700px", perspectiveOrigin: "55% 50%" }}>
            <div
              className="grid justify-items-center"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(54deg) rotateZ(42deg)",
              }}
            >
              {layers.map((label, i) => {
                const top = i === 0;
                const on = hi === i;
                const z = (n - 1 - i) * GAP + (on ? 38 : 0);
                return (
                  // Panels are purely visual: the labels drive all hover, so the
                  // overlapping layers can never fight over the pointer.
                  <div
                    key={label}
                    aria-hidden="true"
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    style={{
                      gridArea: "1 / 1",
                      transform: `translateZ(${z}px)`,
                      transition:
                        "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background-color 0.3s, box-shadow 0.3s, opacity 0.3s",
                    }}
                    className={`pointer-events-none flex h-[180px] w-[180px] items-center justify-center rounded-[30px] border ${
                      top
                        ? "border-[var(--accent)]/60 bg-[color-mix(in_oklab,var(--accent)_20%,var(--surface))] shadow-[0_34px_66px_-20px_color-mix(in_oklab,var(--accent)_55%,transparent)]"
                        : on
                          ? "border-[var(--accent)]/70 bg-[color-mix(in_oklab,var(--accent)_16%,var(--surface))] shadow-[0_30px_64px_-22px_color-mix(in_oklab,var(--accent)_55%,transparent)]"
                          : "border-[var(--fg)]/26 bg-[color-mix(in_oklab,var(--fg)_12%,var(--surface))] shadow-[0_26px_54px_-24px_rgba(0,0,0,0.7)]"
                    }`}
                  >
                    {/* Counter-rotate the icon so it faces the viewer flat. */}
                    <span
                      style={{ transform: "rotateZ(-42deg) rotateX(-54deg)" }}
                      className={
                        top || on
                          ? "text-[var(--accent-text)]"
                          : "text-[var(--accent-text)]/90"
                      }
                    >
                      <LayerIcon label={label} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Labels, evenly spaced, aligned to the fan. */}
        {layers.map((label, i) => {
          const on = hi === i;
          return (
            <button
              key={label}
              type="button"
              onMouseEnter={() => setHi(i)}
              onMouseLeave={() => setHi(null)}
              style={{
                left: `${(LABEL_X / W) * 100}%`,
                top: `${(labelY(i) / H) * 100}%`,
              }}
              className={`absolute -translate-y-1/2 rounded-full border px-4 py-2.5 text-left font-mono text-[10px] font-medium uppercase leading-[1.4] tracking-[0.12em] transition-colors duration-300 ${
                on
                  ? "border-[var(--accent)]/70 bg-[var(--surface)] text-[var(--fg)]"
                  : "border-[var(--hairline-strong)] bg-[var(--surface)]/70 text-[var(--fg)]/70"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
