"use client";

import { useEffect, useRef, useState } from "react";

// The "Plugs into what you already use" map, made alive.
//
// Your stack orbits the product core in a slow, continuous turn (Option 1), and
// clicking any node lifts it forward — enlarged, lit, rotation frozen so it is
// readable — while the rest recede (Option 2). All motion runs in a single
// requestAnimationFrame loop that writes transforms directly (no per-frame React
// re-render), pauses on hover and on focus, and is disabled entirely under
// prefers-reduced-motion, where the map falls back to a static, still-clickable
// layout. The pill labels are real text; decorative geometry is aria-hidden.

const W = 660;
const H = 560;
const CX = W / 2;
const CY = H / 2;
const R = 238; // orbit radius (a true circle, so rotation reads clean)
const SPEED = 360 / 48; // degrees per second — one turn every 48s
const SIG = 3.6; // seconds for a signal to travel core -> node

export function IntegrationOrbit({ items }: { items: string[] }) {
  const n = items.length;
  // Base angle per node, offset a half-step off top-dead-centre so nothing
  // points straight up into the nav.
  const base = items.map((_, i) => -90 + 180 / n + i * (360 / n));

  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const sigRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rot = useRef(0);
  const last = useRef(0);
  const hover = useRef(false);
  const focusRef = useRef<number | null>(null);

  const [focused, setFocused] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  focusRef.current = focused;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let raf = 0;
    const place = (
      i: number,
      x: number,
      y: number,
      t: number,
      moving: boolean
    ) => {
      const node = nodeRefs.current[i];
      if (node) {
        node.style.left = `${(x / W) * 100}%`;
        node.style.top = `${(y / H) * 100}%`;
      }
      const line = lineRefs.current[i];
      if (line) {
        line.setAttribute("x2", String(x));
        line.setAttribute("y2", String(y));
      }
      const sig = sigRefs.current[i];
      if (sig) {
        if (!moving) {
          sig.style.opacity = "0";
        } else {
          const p = (t / SIG + i / n) % 1;
          const sx = CX + (x - CX) * p;
          const sy = CY + (y - CY) * p;
          sig.style.left = `${(sx / W) * 100}%`;
          sig.style.top = `${(sy / H) * 100}%`;
          sig.style.opacity =
            p < 0.12 ? String(p / 0.12) : p > 0.85 ? String((1 - p) / 0.15) : "1";
        }
      }
    };

    const frame = (ts: number) => {
      if (!last.current) last.current = ts;
      const dt = (ts - last.current) / 1000;
      last.current = ts;
      const t = ts / 1000;
      const paused = reduced || hover.current || focusRef.current !== null;
      if (!paused) rot.current = (rot.current + SPEED * dt) % 360;
      const moving = !reduced && focusRef.current === null;
      for (let i = 0; i < n; i++) {
        const a = ((base[i] + (reduced ? 0 : rot.current)) * Math.PI) / 180;
        place(i, CX + R * Math.cos(a), CY + R * Math.sin(a), t, moving);
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

  return (
    <div
      className="relative mx-auto hidden h-[560px] w-full max-w-[660px] select-none sm:block"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      onClick={() => setFocused(null)}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
      >
        <g stroke="var(--hairline-strong)" strokeWidth="1.25">
          {items.map((_, i) => (
            <line
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY}
              className="transition-opacity duration-500"
              style={{ opacity: focused !== null && focused !== i ? 0.25 : 1 }}
            />
          ))}
        </g>

        {/* Core: a soft pulsing ring around a solid gold node. */}
        <circle
          cx={CX}
          cy={CY}
          r="34"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.4"
          className="animate-soft-pulse"
        />
        <circle
          cx={CX}
          cy={CY}
          r="22"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <circle cx={CX} cy={CY} r="4.5" fill="var(--accent)" />
      </svg>

      {/* Signals travelling out along each spoke. */}
      {items.map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            sigRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: 0,
            background: "var(--accent)",
            filter: "drop-shadow(0 0 5px var(--accent))",
          }}
        />
      ))}

      {/* The orbiting nodes. */}
      {items.map((label, i) => {
        const isFocused = focused === i;
        const dim = focused !== null && !isFocused;
        return (
          <button
            key={i}
            type="button"
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            onClick={(e) => {
              e.stopPropagation();
              setFocused(isFocused ? null : i);
            }}
            style={{ left: "50%", top: "50%" }}
            className={`absolute max-w-[10.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border px-4 py-2.5 text-center font-mono text-[10px] font-medium uppercase leading-[1.55] tracking-[0.12em] shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] outline-none transition-[transform,color,border-color,background-color,box-shadow,opacity] duration-300 ${
              isFocused
                ? "z-20 scale-[1.14] border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_12%,var(--surface))] text-[var(--fg)] shadow-[0_18px_44px_-16px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
                : "z-10 border-[var(--hairline-strong)] bg-[var(--surface)] text-[var(--fg)]/70 hover:border-[var(--accent)]/70 hover:text-[var(--fg)]"
            } ${dim ? "opacity-30 blur-[0.5px]" : "opacity-100"}`}
          >
            {label}
          </button>
        );
      })}

      {/* Focus caption: the selected surface, named, reinforcing the promise. */}
      <div
        aria-live="polite"
        className={`pointer-events-none absolute inset-x-0 bottom-2 flex flex-col items-center gap-1 text-center transition-opacity duration-300 ${
          focused !== null ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
          Connected
        </span>
        <span className="text-sm text-[var(--fg)]/80">
          Reads and writes in place. No migration, no rip-and-replace.
        </span>
      </div>
    </div>
  );
}
