import { blogPosts, getBlogPost } from "@/data/blog";
import { site } from "@/data/site";
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.company} article`;

// One OG card per blog post, titled with the post itself. Pre-rendered for
// every slug so link previews are ready at build time.
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return renderOgCard({
    eyebrow: post?.kind === "case-study" ? "Case study" : "Insights",
    title: post?.title ?? site.company,
  });
}
