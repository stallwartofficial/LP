"use client";

import { useEffect, useRef, useState } from "react";

// The partner ecosystem, as a living map instead of a six-card grid.
//
// STALLWART sits at the core; the six ways to partner orbit it in a slow,
// continuous turn. Hover a node to preview it, click to lock it — the panel
// beside the map swaps to that model's detail and its spoke lights up. Rotation
// pauses while the pointer is over the map (so a node is easy to aim at) and is
// disabled under prefers-reduced-motion. On small screens the orbit is replaced
// by a plain, tappable list carrying the same content.
//
// Motion runs in one requestAnimationFrame loop that writes transforms directly,
// so there is no per-frame React re-render. Decorative geometry is aria-hidden;
// every model name and description is real text.

export type PartnerModel = {
  key: string;
  short: string;
  name: string;
  tagline: string;
  blurb: string;
};

const SIZE = 520;
const C = SIZE / 2;
const R = 196;
const SPEED = 360 / 60; // one turn per 60s

export function PartnerEcosystem({ models }: { models: PartnerModel[] }) {
  const n = models.length;
  const base = models.map((_, i) => -90 + i * (360 / n));

  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const rot = useRef(0);
  const last = useRef(0);
  const hover = useRef(false);

  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const shown = preview ?? active;
  const shownRef = useRef(shown);
  shownRef.current = shown;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let raf = 0;
    const frame = (ts: number) => {
      if (!last.current) last.current = ts;
      const dt = (ts - last.current) / 1000;
      last.current = ts;
      if (!reduced && !hover.current) rot.current = (rot.current + SPEED * dt) % 360;
      for (let i = 0; i < n; i++) {
        const a = ((base[i] + (reduced ? 0 : rot.current)) * Math.PI) / 180;
        const x = C + R * Math.cos(a);
        const y = C + R * Math.sin(a);
        const node = nodeRefs.current[i];
        if (node) {
          node.style.left = `${(x / SIZE) * 100}%`;
          node.style.top = `${(y / SIZE) * 100}%`;
        }
        const line = lineRefs.current[i];
        if (line) {
          line.setAttribute("x2", String(x));
          line.setAttribute("y2", String(y));
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      last.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, n]);

  const current = models[shown];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-14">
      {/* ---- Desktop: the orbit ---- */}
      <div
        className="relative mx-auto hidden aspect-square w-full max-w-[520px] select-none sm:block"
        onMouseLeave={() => {
          hover.current = false;
          setPreview(null);
        }}
        onMouseEnter={() => (hover.current = true)}
      >
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full"
        >
          <g strokeWidth="1.25">
            {models.map((_, i) => (
              <line
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                x1={C}
                y1={C}
                x2={C}
                y2={C}
                stroke={
                  i === shown ? "var(--accent)" : "var(--hairline-strong)"
                }
                className="transition-[stroke,opacity] duration-500"
                style={{ opacity: i === shown ? 0.9 : 0.4 }}
              />
            ))}
          </g>
          <circle
            cx={C}
            cy={C}
            r="46"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.35"
            className="animate-soft-pulse"
          />
          <circle
            cx={C}
            cy={C}
            r="34"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Core label */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent-text)]">
          Stallwart
        </span>

        {/* Nodes */}
        {models.map((m, i) => {
          const on = i === shown;
          return (
            <button
              key={m.key}
              type="button"
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              onMouseEnter={() => setPreview(i)}
              onFocus={() => setPreview(i)}
              onBlur={() => setPreview(null)}
              onClick={() => {
                setActive(i);
                setPreview(null);
              }}
              style={{ left: "50%", top: "50%" }}
              aria-pressed={i === active}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] outline-none transition-[transform,color,border-color,background-color,box-shadow] duration-300 ${
                on
                  ? "z-10 scale-105 border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_12%,var(--surface))] text-[var(--fg)] shadow-[0_14px_36px_-16px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
                  : "border-[var(--hairline-strong)] bg-[var(--surface)] text-[var(--fg)]/70 hover:border-[var(--accent)]/70 hover:text-[var(--fg)]"
              }`}
            >
              {m.short}
            </button>
          );
        })}
      </div>

      {/* ---- Detail panel (desktop) ---- */}
      <div className="hidden sm:block">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--accent),transparent)] opacity-60"
          />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
              {String(shown + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/45">
              Partnership model
            </span>
          </div>
          <h3 className="font-display mt-4 text-[length:var(--text-step-2)] font-light">
            {current.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-[var(--accent-text)]">
            {current.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--fg)]/75">
            {current.blurb}
          </p>
          <a
            href="#apply"
            className="link-draw mt-6 inline-block text-sm font-medium text-[var(--accent-text)]"
          >
            Explore {current.short.toLowerCase()} partnerships →
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-[var(--fg)]/50">
          Hover to preview, click to hold. Six ways to build together.
        </p>
      </div>

      {/* ---- Mobile: plain tappable list ---- */}
      <ul className="space-y-3 sm:hidden">
        {models.map((m) => (
          <li
            key={m.key}
            className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
          >
            <h3 className="font-display text-[length:var(--text-step-1)] leading-tight">
              {m.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-[var(--accent-text)]">
              {m.tagline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/75">
              {m.blurb}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
