import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Contact Stallwart";

export default function Image() {
  return renderOgCard({
    eyebrow: "Get in touch",
    title: "Tell us what keeps|falling through.",
  });
}
