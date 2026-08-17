import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
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

const inter = Inter({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
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
      className={`h-full antialiased ${fraunces.variable} ${inter.variable}`}
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
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
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
