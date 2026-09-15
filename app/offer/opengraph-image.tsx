import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Stallwart, what we build";

export default function Image() {
  return renderOgCard({
    eyebrow: "What we build",
    title: "Bring the problem.|We build the AI that solves it.",
  });
}
