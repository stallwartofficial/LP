"use client";

import { useState } from "react";

// "Plugs into what you already use" as an interactive isometric stack.
//
// Each surface you already run is a floating glass layer; the top one is lit in
// gold. Layers are connected by dotted leaders to labels on the right. Hovering a
// layer (or its label) lifts it forward, brightens it, and highlights the pair —
// so the whole thing reads as one system sitting on top of your stack. The scene
// bobs gently unless prefers-reduced-motion is set. Real, on-brand line icons —
// no third-party logos, so we never imply a named integration we don't have.
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
      className="h-8 w-8"
    >
      {iconFor(label)}
    </svg>
  );
}

const GAP = 42; // vertical separation between layers, in the 3D space

export function IntegrationStack({ items }: { items: string[] }) {
  const layers = items.slice(0, 5); // the stack stays elegant at up to five
  const n = layers.length;
  const [hi, setHi] = useState<number | null>(null);

  return (
    <div className="relative hidden min-h-[440px] items-center sm:flex">
      <div className="animate-stack-float relative mx-auto w-full">
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          {/* The isometric stack */}
          <div
            className="relative"
            style={{ perspective: "1600px", perspectiveOrigin: "60% 50%" }}
          >
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
                // Top layer highest; hovered layer lifts further.
                const z = (n - 1 - i) * GAP + (on ? 34 : 0);
                return (
                  <button
                    key={label}
                    type="button"
                    onMouseEnter={() => setHi(i)}
                    onMouseLeave={() => setHi(null)}
                    onFocus={() => setHi(i)}
                    onBlur={() => setHi(null)}
                    style={{
                      gridArea: "1 / 1",
                      transform: `translateZ(${z}px)`,
                      transition:
                        "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background-color 0.3s, box-shadow 0.3s",
                    }}
                    className={`flex h-[150px] w-[150px] items-center justify-center rounded-[26px] border backdrop-blur-md outline-none ${
                      top
                        ? "border-[var(--accent)]/60 bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--accent-text)] shadow-[0_30px_60px_-20px_color-mix(in_oklab,var(--accent)_55%,transparent)]"
                        : on
                          ? "border-[var(--accent)]/70 bg-[color-mix(in_oklab,var(--accent)_10%,color-mix(in_oklab,var(--fg)_8%,transparent))] text-[var(--fg)] shadow-[0_28px_60px_-22px_color-mix(in_oklab,var(--accent)_55%,transparent)]"
                          : "border-[var(--fg)]/20 bg-[color-mix(in_oklab,var(--fg)_11%,transparent)] text-[var(--fg)]/75 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]"
                    }`}
                  >
                    {/* Counter-rotate the icon so it faces the viewer flat. */}
                    <span
                      style={{
                        transform: "rotateZ(-42deg) rotateX(-54deg)",
                      }}
                      className={
                        top || on
                          ? "text-[var(--accent-text)]"
                          : "text-[var(--accent-text)]/70"
                      }
                    >
                      <LayerIcon label={label} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Labels, one per layer, with a dotted leader. */}
          <ul className="relative z-10 ml-2 flex flex-col justify-center gap-3">
            {layers.map((label, i) => {
              const on = hi === i;
              return (
                <li key={label} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-px w-6 border-t border-dashed transition-colors duration-300 ${
                      on ? "border-[var(--accent)]" : "border-[var(--fg)]/25"
                    }`}
                  />
                  <button
                    type="button"
                    onMouseEnter={() => setHi(i)}
                    onMouseLeave={() => setHi(null)}
                    className={`rounded-full border px-3.5 py-2 text-left font-mono text-[10px] font-medium uppercase leading-[1.4] tracking-[0.1em] transition-colors duration-300 ${
                      on
                        ? "border-[var(--accent)]/60 bg-[var(--surface)] text-[var(--fg)]"
                        : "border-[var(--hairline-strong)] bg-[var(--surface)]/70 text-[var(--fg)]/70"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
