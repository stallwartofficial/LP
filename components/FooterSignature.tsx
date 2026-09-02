"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";

// Closing signature. The company name at grand scale, filled with the drafting
// blueprint. On desktop a warm gold spotlight tracks the cursor across the
// wordmark, so hovering the letters lights them from within. On touch (or with
// reduced motion) the spotlight drifts slowly on its own, so there's always
// something living without ever spending main-thread work per frame.
//
// Performance choices, deliberate:
//   - Text is background-clip: text on a static <h2>, so the wordmark is real
//     text (SEO + a11y) and every layer is a paint, not JS.
//   - Cursor tracking writes two CSS custom properties on the element; the
//     browser compositor moves the gradient. No React state, no re-render.
//   - The listener is rAF-coalesced, so at 120Hz mouse rate we still do one
//     update per frame.
//   - Fallback drift is a plain CSS keyframe.
export function FooterSignature() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // Touch devices and reduced-motion users skip cursor tracking; the ambient
    // drift animation (defined in CSS) carries the moment instead.
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("fs-ambient");
      return;
    }

    let raf = 0;
    let px = 50;
    let py = 55;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 100;
      py = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--sx", `${px}%`);
          el.style.setProperty("--sy", `${py}%`);
          raf = 0;
        });
      }
    };
    const onLeave = () => {
      // Return to center, softly, via the CSS transition on the gradient.
      el.style.setProperty("--sx", `50%`);
      el.style.setProperty("--sy", `55%`);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const name = site.company.toLowerCase();

  return (
    <section aria-hidden="true" className="fs-fixed">
      <div ref={rootRef} className="fs-plate">
        <h2 className="fs-wordmark">{name}</h2>
      </div>
    </section>
  );
}
