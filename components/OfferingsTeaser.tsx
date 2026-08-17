"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { offerings } from "@/data/offerings";

export function OfferingsTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm italic tracking-widest text-[var(--accent)]">
          the engine
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">What We Offer</h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {offerings.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-[var(--accent)]/15 bg-[var(--surface)] p-6"
          >
            <span className="text-xs uppercase tracking-widest text-[var(--accent)]">
              {item.eyebrow}
            </span>
            <h3 className="mt-2 font-display text-lg">{item.title}</h3>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/offer"
          className="text-sm font-medium text-[var(--accent)] hover:underline"
        >
          See the full breakdown →
        </Link>
      </div>
    </section>
  );
}
