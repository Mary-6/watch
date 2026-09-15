export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getPostBySlug } from "@/actions/blog";
import Image from "next/image";
import { format } from "date-fns";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found | Aurent" };
  return {
    title: `${post.title} | Aurent Journal`,
    description: post.excerpt?.slice(0, 160) ?? `Read ${post.title}`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {post.featuredImage ? (
          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden bg-ink">
            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="100vw" />
          </div>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-widest text-stone">
          {post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "—"}
        </p>
        <h1 className="mt-4 font-display text-4xl font-light md:text-5xl">{post.title}</h1>
        {post.excerpt ? <p className="mt-4 text-stone">{post.excerpt}</p> : null}
        <div
          className="prose prose-lg mt-8 max-w-none text-ink"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
