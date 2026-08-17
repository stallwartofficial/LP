import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";

// NOTE: next/font/google (Fraunces, Inter) couldn't reach fonts.googleapis.com
// in this sandboxed build environment. On Vercel/local dev this restriction
// won't exist — swap back to:
//   import { Fraunces, Inter } from "next/font/google";
//   const fraunces = Fraunces({ variable: "--font-display", subsets: ["latin"], weight: ["400","500","600"] });
//   const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
// and add `${fraunces.variable} ${inter.variable}` back to the <html> className below.

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.company} — ${site.productDescriptor}`,
    template: `%s — ${site.company}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.company} — ${site.productDescriptor}`,
    description: site.description,
    url: site.domain,
    siteName: site.company,
    images: ["/images/og-cover.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.company} — ${site.productDescriptor}`,
    description: site.description,
  },
  icons: { icon: "/images/favicon.png" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.company,
  url: site.domain,
  description: site.description,
  slogan: site.tagline,
  makesOffer: {
    "@type": "Product",
    name: site.product,
    description: site.productDescriptor,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        {children}
      </body>
    </html>
  );
}
