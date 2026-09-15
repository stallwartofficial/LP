"use client";

import { useEffect, useState } from "react";

// Rotating "anything AI" list for the hero. One motion moment, LCP-safe:
// renders the first word in SSR, then cycles. Respects reduced-motion (holds).
export function FlipWords({
  words,
  interval = 2000,
}: {
  words: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnim(false);
      return;
    }
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      style={{
        display: "inline-grid",
        overflow: "hidden",
        verticalAlign: "bottom",
        minWidth: "8ch",
        textAlign: "left",
      }}
      aria-live="polite"
    >
      <span
        key={i}
        className="text-gold-sheen italic"
        style={{
          gridArea: "1/1",
          animation: anim ? "flipUp 500ms var(--ease-out-expo, cubic-bezier(0.16,1,0.3,1))" : "none",
          whiteSpace: "nowrap",
        }}
      >
        {words[i]}
      </span>
    </span>
  );
}
