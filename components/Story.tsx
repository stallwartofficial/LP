"use client";

import { motion } from "framer-motion";

export function Story() {
  return (
    <section id="story" className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
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
        Our Story
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--fg)]/85"
      >
        <p>
          Every sales team we ever watched had the same quiet tragedy: the
          right lead came in at the wrong moment — after hours, mid-meeting,
          buried under twelve other things — and by the time anyone got back
          to it, the moment was gone. Not from a lack of care. From a lack of
          hands.
        </p>
        <p>
          Stallwart started with a founder who believed that was solvable —
          not by asking people to work harder, but by building something that
          never stops working at all. Something that notices the lead the
          second it arrives, understands who's worth calling first, and
          follows up before the window closes, every single time.
        </p>
        <p>
          That belief became Extrovert AI. Not a tool you have to remember to
          use — a system that remembers for you. We named the company
          Stallwart because that's the standard we hold ourselves to: built
          to last, built to show up, built beyond what a CRM was supposed to
          be.
        </p>
      </motion.div>
    </section>
  );
}
