"use server";

import { prisma } from "@/lib/prisma";
import { brandSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import type { Brand } from "@prisma/client";

export async function getBrands(): Promise<Brand[]> {
  return prisma.brand.findMany({
    where: { status: "ACTIVE" },
    orderBy: { name: "asc" },
  });
}

export async function getBrandBySlug(slug: string) {
  return prisma.brand.findUnique({
    where: { slug },
    include: { products: { where: { status: "ACTIVE" }, include: { images: true, brand: true } } },
  });
}

export async function createBrand(data: any) {
  const parsed = brandSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const brand = await prisma.brand.create({ data: { ...parsed.data, slug: slugify(parsed.data.name) } });
  revalidatePath("/brands");
  return { success: true, brand };
}

export async function updateBrand(id: string, data: any) {
  const parsed = brandSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const brand = await prisma.brand.update({ where: { id }, data: parsed.data });
  revalidatePath("/brands");
  return { success: true, brand };
}

export async function deleteBrand(id: string) {
  await prisma.brand.delete({ where: { id } });
  revalidatePath("/brands");
  return { success: true };
}
