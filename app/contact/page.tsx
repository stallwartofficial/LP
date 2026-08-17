import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a demo with Stallwart. Bring us the process that only works because someone remembers it, and we'll show you which part a system can take over.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Contact />
    </div>
  );
}
