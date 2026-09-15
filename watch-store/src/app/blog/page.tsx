export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/actions/blog";
import { format } from "date-fns";

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">The Journal</h1>
        <p className="mb-12 text-stone">Stories, horological insights, and collector notes from Aurent.</p>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[3/2] overflow-hidden bg-ink">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : null}
              </Link>
              <div className="mt-4">
                <p className="text-xs text-stone">{post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "—"}</p>
                <h2 className="mt-2 font-display text-xl font-medium">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brass">{post.title}</Link>
                </h2>
                <p className="mt-2 text-sm text-stone line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
