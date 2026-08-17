"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/data/site";
import { PipelineVisual } from "./PipelineVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 text-center lg:px-8 lg:pt-28">
      {/* Subtle radial glow, parallax-lite via CSS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,var(--accent)_0%,transparent_60%)] opacity-[0.08]"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-display text-sm italic tracking-widest text-[var(--accent)]"
      >
        {site.tagline}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl"
      >
        {site.productDescriptor}.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-6 max-w-xl text-lg text-[var(--fg)]/75"
      >
        {site.company} built {site.product} so no lead ever waits on a human to
        notice it. Capture, score, follow up, close — on autopilot.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-9 flex justify-center gap-4"
      >
        <Link
          href="#contact"
          className="rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-medium text-[var(--color-ink)] transition-transform hover:scale-105"
        >
          {site.cta.primary}
        </Link>
        <Link
          href="#offer"
          className="rounded-full border border-[var(--accent)]/40 px-7 py-3 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
        >
          See how it works
        </Link>
      </motion.div>

      <div className="mt-20">
        <PipelineVisual />
      </div>
    </section>
  );
}
