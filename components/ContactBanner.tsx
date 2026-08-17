import Link from "next/link";
import { site } from "@/data/site";

// Full-bleed closing statement. Inverted against the page in light mode so the
// last thing a reader sees carries maximum weight.
export function ContactBanner() {
  return (
    <section
      aria-labelledby="contact-banner-heading"
      className="relative isolate overflow-hidden bg-[var(--color-ink)] px-[var(--space-gutter)] py-[var(--space-section)] text-[var(--color-cream)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -bottom-1/2 left-1/2 h-[60vh] w-[110vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.28)_0%,transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-[var(--color-gold-bright)]">
          {site.tagline}
        </p>

        <h2
          id="contact-banner-heading"
          className="font-display mt-6 text-display-lg font-light"
        >
          Tell us what keeps
          <br />
          <span className="italic text-[var(--color-gold-bright)]">
            falling through.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-xl text-[length:var(--text-step-1)] text-[var(--color-cream)]/70">
          Bring us the process that only works because someone remembers it.
          We&apos;ll show you which part a system can take over, and say so
          plainly if the answer is none of it.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-[var(--color-gold-bright)] px-8 py-4 text-sm font-medium text-[var(--color-ink)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-[var(--color-cream)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            />
            <span className="relative">{site.cta.primary}</span>
          </Link>

          <a
            href={`mailto:${site.contact.email}`}
            className="link-draw px-4 py-4 text-sm text-[var(--color-cream)]/70"
          >
            or email us directly
          </a>
        </div>
      </div>
    </section>
  );
}
