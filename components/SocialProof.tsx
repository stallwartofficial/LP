"use client";

import { motion } from "framer-motion";
import { testimonials, logoMarks } from "@/data/testimonials";

export function SocialProof() {
  const marqueeMarks = [...logoMarks, ...logoMarks]; // duplicate for seamless loop

  return (
    <section className="border-y border-[var(--accent)]/10 bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-[var(--fg)]/50">
          Trusted by sales teams building for scale
        </p>

        {/* Infinite scrolling logo strip */}
        <div
          className="mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          aria-hidden="true"
        >
          <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
            {marqueeMarks.map((mark, i) => (
              <span
                key={`${mark}-${i}`}
                className="whitespace-nowrap font-display text-lg tracking-widest text-[var(--fg)]/35"
              >
                {mark}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.role}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-[var(--accent)]/15 bg-[var(--bg)] p-6"
            >
              <blockquote className="text-[var(--fg)]/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-[var(--fg)]/60">
                <span className="font-medium text-[var(--fg)]/80">{t.role}</span>
                {" · "}
                {t.industry}
                <span className="ml-2 text-xs italic text-[var(--fg)]/40">
                  (example outcome)
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
