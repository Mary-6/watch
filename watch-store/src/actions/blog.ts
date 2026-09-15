"use server";

import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getPublishedPosts(limit = 6) {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function createBlogPost(data: any) {
  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const post = await prisma.blogPost.create({
    data: { ...parsed.data, slug: slugify(parsed.data.title), publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null },
  });
  revalidatePath("/blog");
  return { success: true, post };
}

export async function updateBlogPost(id: string, data: any) {
  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const post = await prisma.blogPost.update({
    where: { id },
    data: parsed.data,
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return { success: true, post };
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  return { success: true };
}
