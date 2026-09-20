"use client";

import { useEffect, useRef, useState } from "react";

// The "what we build" terminal. Renders as a real terminal window: a typed
// query, then the four capabilities revealed as output, line by line, with a
// live caret. All text is in the initial HTML (crawlable); the animation is a
// progressive enhancement that runs once the block scrolls into view and is
// skipped entirely under reduced motion.
const COMMAND = "stallwart build --anything";

const OUTPUT = [
  { name: "AI Agents & Automation", line: "software that does your repetitive work on its own, around the clock." },
  { name: "AI + SaaS Products", line: "a complete app or platform, built and fully owned by you." },
  { name: "AI Infrastructure & RAG", line: "AI that answers from your own data, accurately and reliably." },
  { name: "Custom AI Systems", line: "anything the others do not cover, built to fit your problem." },
];

export function TerminalBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [typed, setTyped] = useState(COMMAND);
  const [revealed, setRevealed] = useState(OUTPUT.length + 1);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !ref.current) return;

    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setAnimate(true);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!animate) return;
    setTyped("");
    setRevealed(0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Type the command.
    for (let i = 1; i <= COMMAND.length; i++) {
      timers.push(setTimeout(() => setTyped(COMMAND.slice(0, i)), i * 34));
    }
    // Then reveal each output line, plus the final summary line.
    const afterType = COMMAND.length * 34 + 260;
    for (let j = 1; j <= OUTPUT.length + 1; j++) {
      timers.push(setTimeout(() => setRevealed(j), afterType + j * 200));
    }
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  const done = typed === COMMAND;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-[var(--hairline-strong)] bg-[#0b0b0e] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] tracking-[0.14em] text-white/60">
          stallwart @ core
        </span>
      </div>

      {/* Body */}
      <div className="px-6 py-7 font-mono text-[13px] leading-relaxed text-[#e9e4d6] sm:px-10 sm:py-9 sm:text-sm">
        <p>
          <span className="text-[var(--accent-text)]">~/build</span>
          <span className="text-white/60"> $ </span>
          <span>{typed}</span>
          {!done && <span className="term-caret" aria-hidden="true" />}
        </p>

        <ol className="mt-5 space-y-5">
          {OUTPUT.map((o, i) => (
            <li
              key={o.name}
              className={`term-line ${revealed > i ? "is-in" : ""}`}
              style={{ transitionDelay: animate ? "0ms" : undefined }}
            >
              <p className="flex items-baseline gap-2">
                <span className="text-[var(--accent)]">→</span>
                <span className="font-mono text-[13px] font-medium tracking-wide text-white sm:text-sm">
                  {o.name}
                </span>
              </p>
              <p className="pl-5 text-white/65">{o.line}</p>
            </li>
          ))}
        </ol>

        <p
          className={`term-line mt-6 flex items-baseline gap-2 border-t border-white/10 pt-5 ${
            revealed > OUTPUT.length ? "is-in" : ""
          }`}
        >
          <span className="text-[var(--accent)]">✓</span>
          <span className="text-[var(--accent-text)]">
            whatever your business needs from AI, built to production on one standard.
            <span className="term-caret" aria-hidden="true" />
          </span>
        </p>
      </div>
    </div>
  );
}
