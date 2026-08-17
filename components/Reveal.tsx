"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// The ONLY client component needed for scroll animation.
//
// Previously each animated section was itself "use client", which pulled all of
// its copy out of the server render, worse for Core Web Vitals and for
// crawlers that don't execute JS. Wrapping just the motion boundary keeps the
// text server-rendered while the animation stays client-side.
//
// `useReducedMotion` is checked explicitly rather than relying on the global
// CSS override, because Framer Motion drives transforms in JS where the
// stylesheet's `transition-duration` reset cannot reach them.

type RevealProps = {
  children: ReactNode;
  /** Stagger index, multiplied into the transition delay. */
  index?: number;
  /** Distance in px to rise from. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "figure" | "article";
};

export function Reveal({
  children,
  index = 0,
  y = 16,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}

/** Same contract as Reveal, but animates immediately on mount (above the fold). */
export function RevealOnLoad({
  children,
  index = 0,
  y = 16,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
