"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/data/site";

export function ContactBanner() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-[var(--accent)]/20 bg-[var(--surface)] px-8 py-16 text-center"
      >
        <h2 className="font-display text-3xl sm:text-4xl">
          Ready to put your pipeline on autopilot?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[var(--fg)]/70">
          Tell us about your team and we'll show you exactly where Extrovert
          AI fits.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-medium text-[var(--color-ink)] transition-transform hover:scale-105"
        >
          {site.cta.primary}
        </Link>
      </motion.div>
    </section>
  );
}
