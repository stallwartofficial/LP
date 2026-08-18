import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/seo";

// Exposed as *-loaded vars so globals.css can keep its own fallback stack in
// @theme without a specificity fight between :root and the font classes.
// Variable font, the full weight axis is available, so display type can sit
// at 300 for large sizes and 600 for small caps without extra network cost.
// `SOFT`/`WONK` axes are requested for Fraunces' softer, more editorial cut.
const fraunces = Fraunces({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
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
});

// Company-led: the site title leads with Stallwart and what the company is.
// The product descriptor belongs on /offer, not on the company's front door.
export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.company} | ${site.companyDescriptor}`,
    template: `%s | ${site.company}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.company} | ${site.companyDescriptor}`,
    description: site.description,
    url: site.domain,
    siteName: site.company,
    type: "website",
    // OG image is generated at build time by app/opengraph-image.tsx,
    // Next injects it here automatically, no static asset to maintain.
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.company} | ${site.companyDescriptor}`,
    description: site.description,
  },
  // Favicon resolves from app/favicon.ico automatically.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}
      // Tells Next the smooth scrolling in globals.css is intentional, so it
      // suppresses it during route transitions instead of warning about it.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <JsonLd schema={organizationSchema()} />
        {/* Applies the stored theme before first paint so there is no flash of
            the wrong theme. Must stay inline and blocking. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
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
        className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]"
        suppressHydrationWarning
      >
        {/* Nav and footer live here, not per-page: a new route cannot ship
            without them, and there is one import instead of sixteen. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-ink)]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
