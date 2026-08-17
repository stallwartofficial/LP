"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";

export function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm italic tracking-widest text-[var(--accent)]">
          proof in practice
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">Case Studies</h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              href={`/case-studies/${cs.slug}`}
              className="group block h-full rounded-2xl border border-[var(--accent)]/15 bg-[var(--surface)] p-8 transition-colors hover:border-[var(--accent)]/50"
            >
              <span className="text-xs uppercase tracking-widest text-[var(--accent)]">
                {cs.industry}
              </span>
              <h3 className="mt-3 font-display text-xl leading-snug">
                {cs.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--fg)]/70">{cs.excerpt}</p>
              <span className="mt-5 inline-block text-sm font-medium text-[var(--accent)] transition-transform group-hover:translate-x-1">
                Read the case study →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
