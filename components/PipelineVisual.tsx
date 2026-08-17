"use client";

import { motion } from "framer-motion";

const stages = ["Captured", "Scored", "Followed Up", "Booked"];

export function PipelineVisual() {
  return (
    <div
      role="img"
      aria-label="Animated diagram showing a lead automatically flowing through capture, scoring, follow-up, and booking stages"
      className="relative mx-auto w-full max-w-2xl"
    >
      <div className="flex items-center justify-between">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-1 flex-col items-center">
            <div className="relative flex items-center w-full">
              {i > 0 && (
                <div className="absolute right-1/2 h-px w-full bg-[var(--accent)]/20" />
              )}
              <motion.div
                initial={{ scale: 0.7, opacity: 0.4 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.35, duration: 0.5, ease: "easeOut" }}
                className="relative z-10 mx-auto flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]"
              />
            </div>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.35 + 0.15, duration: 0.4 }}
              className="mt-3 text-center text-xs uppercase tracking-wider text-[var(--fg)]/70"
            >
              {stage}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Traveling glow trail — decorative, aria-hidden */}
      <motion.div
        aria-hidden="true"
        className="absolute top-2 left-0 h-2 w-2 rounded-full bg-[var(--color-gold-bright)] blur-[2px]"
        initial={{ left: "0%", opacity: 0 }}
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      />
    </div>
  );
}
