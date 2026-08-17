import { getBlogPost, blogPosts } from "@/data/blog";
import { renderOgCard, ogSize, ogContentType } from "@/lib/ogImage";

export const size = ogSize;
export const contentType = ogContentType;

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
    eyebrow: "Blog",
    title: post?.title ?? "Blog",
  });
}
