"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-sm italic tracking-widest text-[var(--accent)]">
          let's talk
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">
          {site.cta.primary}
        </h2>
        <p className="mt-4 text-[var(--fg)]/70">
          Tell us about your pipeline. We'll show you exactly where autopilot
          fits.
        </p>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-10 max-w-md rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-8 text-center"
          role="status"
        >
          <p className="font-display text-lg">Request received.</p>
          <p className="mt-2 text-sm text-[var(--fg)]/70">
            We'll be in touch shortly to schedule your demo.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-lg border border-[var(--accent)]/20 bg-[var(--surface)] px-4 py-2.5 outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Work Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-[var(--accent)]/20 bg-[var(--surface)] px-4 py-2.5 outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              className="mt-1 w-full rounded-lg border border-[var(--accent)]/20 bg-[var(--surface)] px-4 py-2.5 outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              What does your pipeline look like today? (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="mt-1 w-full rounded-lg border border-[var(--accent)]/20 bg-[var(--surface)] px-4 py-2.5 outline-none focus:border-[var(--accent)]"
            />
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-red-500">
              Something went wrong sending your request. Please try again or
              email us directly at {site.contact.email}.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-medium text-[var(--color-ink)] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "loading" ? "Sending…" : site.cta.primary}
          </button>
        </form>
      )}

      <div className="mt-10 text-center text-sm text-[var(--fg)]/50">
        <p>{site.contact.email}</p>
        <p>{site.contact.phone}</p>
      </div>
    </section>
  );
}
