import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { FaqSearch } from "@/components/FaqSearch";
import { faqs, faqCategories } from "@/data/faqs";
import { breadcrumbSchema, faqSchema, pageMeta, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI Development FAQ",
  description:
    "Answers to the common questions about Stallwart: what we do, product vs services, pricing, ownership, security and data, how engagements start, and partnering.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqSchema(faqs),
          webPageSchema({
            name: "FAQ",
            description:
              "Answers to common questions about Stallwart: what we do, how engagements work, pricing, ownership, and security.",
            path: "/faq",
          }),
        ]}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">FAQ</p>
          <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
            Questions,{" "}
            <span className="text-gold-sheen italic">answered plainly.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            The things people ask most, in one place. If yours isn&apos;t here,
            a real person will answer it.
          </p>
          <FaqSearch categories={faqCategories} />
        </div>
      </main>
    </>
  );
}
