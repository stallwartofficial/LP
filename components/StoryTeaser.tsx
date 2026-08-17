"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function StoryTeaser() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-sm italic tracking-widest text-[var(--accent)]"
      >
        the origin
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-3 font-display text-3xl sm:text-4xl"
      >
        Built by people who watched leads go cold
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mx-auto mt-5 max-w-xl text-[var(--fg)]/75"
      >
        Stallwart started with a simple belief: the right lead shouldn't lose
        to the wrong moment. That belief became Extrovert AI.
      </motion.p>
      <Link
        href="/story"
        className="mt-6 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
      >
        Read our full story →
      </Link>
    </section>
  );
}
