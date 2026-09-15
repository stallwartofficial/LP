import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "About Stallwart";

export default function Image() {
  return renderOgCard({
    eyebrow: "About",
    title: "What we believe,|before we build.",
  });
}
