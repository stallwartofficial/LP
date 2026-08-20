import type { ReactNode } from "react";

// Scroll and mount reveals, in CSS.
//
// WHY THIS WAS REWRITTEN. These two components were the last consumers of
// framer-motion on the site, which meant the entire animation library shipped to
// every page in order to fade a few elements in. Lighthouse put total blocking
// time at 530ms and LCP render delay near 4s on throttled mobile, and this was
// the largest avoidable share of it.
//
// The replacements are server components with no JavaScript at all:
//   Reveal        uses the scroll-driven `scroll-rise` class, which runs on the
//                 compositor via animation-timeline: view().
//   RevealOnLoad  uses `enter-rise`, a @starting-style transition that plays once
//                 on first paint.
//
// Both degrade to visible content where unsupported, and both are canceled
// under prefers-reduced-motion (see globals.css), so nothing can be left stuck
// at opacity 0.
//
// The `index` prop keeps its meaning as a stagger position, applied as a
// transition and animation delay rather than through a JS timeline.

type RevealProps = {
  children: ReactNode;
  /** Stagger position. Multiplied into the delay. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "figure" | "article" | "section";
  /**
   * Retained for source compatibility with the previous framer-motion API.
   * Distance is now set in CSS, so this is intentionally ignored.
   */
  y?: number;
};

const delayFor = (index: number) =>
  ({ animationDelay: `${index * 70}ms`, transitionDelay: `${index * 70}ms` }) as React.CSSProperties;

/** Reveals as it scrolls into view. */
export function Reveal({
  children,
  index = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      className={["scroll-rise", className].filter(Boolean).join(" ")}
      style={delayFor(index)}
    >
      {children}
    </Tag>
  );
}

/** Reveals once on first paint, for content above the fold. */
export function RevealOnLoad({
  children,
  index = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      className={["enter-rise", className].filter(Boolean).join(" ")}
      style={delayFor(index)}
    >
      {children}
    </Tag>
  );
}
