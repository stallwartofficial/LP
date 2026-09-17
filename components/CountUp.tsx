"use client";

import { useEffect, useRef, useState } from "react";

// Count-up number that "spins" from 0 to the target when it scrolls into view,
// like a tally rolling up. Reduced-motion shows the final number instantly.
export function CountUp({
  to,
  durationMs = 1100,
  className,
}: {
  to: number;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const step = (t: number) => {
          if (!start) start = t;
          const p = Math.min((t - start) / durationMs, 1);
          // Ease-out so it decelerates into the final number.
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * to));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
