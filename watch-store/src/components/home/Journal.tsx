import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/actions/blog";
import SectionTitle from "./SectionTitle";
import { format } from "date-fns";

export default async function Journal() {
  const posts = await getPublishedPosts(3);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle title="The Journal" subtitle="Stories & Insights" />
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
                <p className="text-xs text-stone">{post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "Coming soon"}</p>
                <h3 className="mt-2 font-display text-xl font-medium">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brass">{post.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-stone line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
