import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FooterSignature } from "@/components/FooterSignature";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ClarityAnalytics } from "@/components/ClarityAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, heroOgImageUrl } from "@/lib/seo";

// Exposed as *-loaded vars so globals.css can keep its own fallback stack in
// @theme without a specificity fight between :root and the font classes.
// Variable font, the full weight axis is available, so display type can sit
// at 300 for large sizes and 600 for small caps without extra network cost.
// Only the `opsz` axis is loaded. SOFT/WONK were requested for an editorial cut
// but nothing sets them in CSS (the animation that once did was removed), so
// they were dead weight on the critical-path font that renders the hero (LCP).
const fraunces = Fraunces({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  axes: ["opsz"],
  // "optional" instead of "swap": on slow connections the browser paints with
  // the adjusted fallback and doesn't repaint later. Lighthouse LCP no longer
  // waits for the font swap, cutting ~400-600ms off mobile-throttled LCP for
  // the text hero. Cached on second load so the real Fraunces renders normally.
  display: "optional",
});

// IBM Plex Sans replaces Inter for body copy. Inter is the safe default every
// generated site reaches for, and it has no point of view. Plex was designed as
// an engineering company's voice, so it carries character while staying sober,
// and it pairs properly against a high-contrast serif.
const plexSans = IBM_Plex_Sans({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Plex Mono for every micro-label and data readout. Sharing a family with the
// body face makes the schematic annotations and the prose visibly related,
// which the generic system-mono stack could never do.
const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  // Micro-labels and readouts, almost all below the fold. Not worth a
  // render-blocking preload against the hero.
  preload: false,
});

// Cinzel: the wordmark face. A Trajan-style classical caps serif used only for
// the "STALLWART" logotype beside the lion mark (navbar + footer), not for body
// or headings. All-caps by design, so it is applied with uppercase + tracking.
const cinzel = Cinzel({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  // Wordmark only (two words). Not on the critical path, so don't preload it and
  // compete with the hero font for the first render.
  preload: false,
});

// Home title/description are tuned for search: the front door leads with the
// "custom software and SaaS company" keywords while sub-pages keep the
// `%s | Stallwart` template. No unverifiable superlative ("leading"), in step
// with the site's honesty voice. The H1 stays the positioning line, so the
// body still carries the "unattended, audited, and trusted" keywords too.
// Kept in sync with the hero (site.hero.*) so search results, LinkedIn/Slack
// previews, and X cards say the same thing the visitor sees. The title leads
// with the actionable positioning ("AI systems and custom software"), then
// pairs the trust promise, then the brand.
const homeTitle =
  "Production-Grade AI Systems & Custom Software | Stallwart";
const homeDescription =
  "Stallwart builds production-grade AI systems and custom software for work that can't be solved off the shelf, engineered for autonomy, governance, and reliability.";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: homeTitle,
    template: `%s | ${site.company}`,
  },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: site.domain,
    siteName: site.company,
    type: "website",
    // US-first primary locale for social previews. Alternates signal EU and
    // India English variants so shares in those regions surface the right tag.
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN"],
    // Point WhatsApp/LinkedIn/Slack at the file-based OG image but with an
    // auto cache-bust query derived from the current hero copy. Any hero
    // change updates the URL, and aggressive social caches fetch fresh.
    images: [{ url: heroOgImageUrl(), width: 1200, height: 630, alt: `${site.company}. ${site.hero.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [heroOgImageUrl()],
  },
  // Favicon resolves from app/favicon.ico automatically.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${fraunces.variable} ${plexSans.variable} ${plexMono.variable} ${cinzel.variable}`}
      // Tells Next the smooth scrolling in globals.css is intentional, so it
      // suppresses it during route transitions instead of warning about it.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <JsonLd schema={organizationSchema()} />
        {/* Applies the theme before first paint so there is no flash. Dark is
            the default: the site is dark unless the visitor explicitly chose
            light. Must stay inline and blocking. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      {/* suppressHydrationWarning on <body>: browser extensions (Grammarly,
          password managers, translators) inject attributes such as
          data-gr-ext-installed into <body> before React hydrates, which
          otherwise reports a mismatch we neither caused nor can fix. This
          suppresses the warning for this element's own attributes only,
          one level deep; children are still fully checked. <html> carries it
          for the same reason plus the theme class set by the script above. */}
      <body
        className="min-h-full text-[var(--fg)]"
        suppressHydrationWarning
      >
        {/* Nav and footer live here, not per-page: a new route cannot ship
            without them, and there is one import instead of sixteen.
            The .page-stack wrapper carries a solid bg + higher z-index so it
            scrolls OVER the fixed signature behind it, giving the Explee-style
            reveal as you scroll past the footer. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-ink)]"
        >
          Skip to content
        </a>
        <div className="page-stack">
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <FooterSignature />
        <CookieConsent />
        <GoogleAnalytics />
        <ClarityAnalytics />
      </body>
    </html>
  );
}
