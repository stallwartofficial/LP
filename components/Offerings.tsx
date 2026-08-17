"use client";

import { motion } from "framer-motion";
import { offerings } from "@/data/offerings";

export function Offerings() {
  return (
    <section id="offer" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm italic tracking-widest text-[var(--accent)]">
          the engine
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">What We Offer</h2>
        <p className="mt-4 text-[var(--fg)]/70">
          Extrovert AI runs the full lead lifecycle end to end — no manual
          handoffs, no dropped threads.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {offerings.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-2xl border border-[var(--accent)]/15 bg-[var(--surface)] p-8 transition-colors hover:border-[var(--accent)]/40"
          >
            <span className="text-xs uppercase tracking-widest text-[var(--accent)]">
              {item.eyebrow}
            </span>
            <h3 className="mt-2 font-display text-xl">{item.title}</h3>
            <p className="mt-3 text-[var(--fg)]/75">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
