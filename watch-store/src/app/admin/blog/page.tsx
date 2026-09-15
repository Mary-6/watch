export const dynamic = "force-dynamic";

import Link from "next/link";
import { getPublishedPosts } from "@/actions/blog";
import { deleteBlogPost } from "@/actions/blog";
import { format } from "date-fns";

export default async function AdminBlogPage() {
  const posts = await getPublishedPosts(100);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl font-light">Blog</h1>
        <span className="text-sm text-stone">Manage via Prisma / DB admin</span>
      </div>
      <div className="overflow-x-auto border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Published</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-ink/10 last:border-b-0">
                <td className="p-4 font-medium">{post.title}</td>
                <td className="p-4 text-stone">{post.status}</td>
                <td className="p-4">{post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "—"}</td>
                <td className="p-4">
                  <form action={async () => { "use server"; await deleteBlogPost(post.id); }}>
                    <button type="submit" className="text-red-700 hover:text-red-900">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
