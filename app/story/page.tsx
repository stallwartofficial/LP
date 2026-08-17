import type { Metadata } from "next";
import { Story } from "@/components/Story";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why Stallwart exists: follow-through is an engineering problem, not a discipline problem. The conviction behind every system we build.",
  alternates: { canonical: "/story" },
};

export default function StoryPage() {
  return (
    <div>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Story", path: "/story" },
        ])}
      />
      <Story />
    </div>
  );
}
