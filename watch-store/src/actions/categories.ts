"use server";

import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  return prisma.category.findMany({
    where: { status: "ACTIVE" },
    orderBy: { name: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { products: { where: { status: "ACTIVE" }, include: { images: true, brand: true } } },
  });
}

export async function createCategory(data: any) {
  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const category = await prisma.category.create({ data: { ...parsed.data, slug: slugify(parsed.data.name) } });
  revalidatePath("/shop");
  return { success: true, category };
}

export async function updateCategory(id: string, data: any) {
  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const category = await prisma.category.update({ where: { id }, data: parsed.data });
  revalidatePath("/shop");
  return { success: true, category };
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/shop");
  return { success: true };
}
