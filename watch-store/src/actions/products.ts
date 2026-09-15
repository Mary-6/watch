"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { productSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true, status: "ACTIVE" },
    include: { brand: true, images: true },
    take: 8,
  });
}

export async function getNewArrivals() {
  return prisma.product.findMany({
    where: { newArrival: true, status: "ACTIVE" },
    include: { brand: true, images: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });
}

export async function getBestsellers() {
  return prisma.product.findMany({
    where: { bestSeller: true, status: "ACTIVE" },
    include: { brand: true, images: true, reviews: { where: { status: "APPROVED" }, include: { user: true } } },
    take: 8,
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { brand: true, category: true, images: true, reviews: { where: { status: "APPROVED" }, include: { user: true } } },
  });
}

export async function getProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  brand?: string;
  category?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  movement?: string;
  caseMaterial?: string;
  sort?: string;
}) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 12;
  const skip = (page - 1) * limit;

  const where: any = { status: "ACTIVE" };

  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { sku: { contains: params.search, mode: "insensitive" } },
      { brand: { name: { contains: params.search, mode: "insensitive" } } },
      { category: { name: { contains: params.search, mode: "insensitive" } } },
    ];
  }
  if (params.brand) {
    where.brand = { slug: params.brand };
  }
  if (params.category) {
    where.category = { slug: params.category };
  }
  if (params.gender) where.gender = params.gender.toUpperCase();
  if (params.minPrice) where.price = { ...where.price, gte: params.minPrice };
  if (params.maxPrice) where.price = { ...where.price, lte: params.maxPrice };
  if (params.movement) where.movement = { contains: params.movement, mode: "insensitive" };
  if (params.caseMaterial) where.caseMaterial = { contains: params.caseMaterial, mode: "insensitive" };

  let orderBy: any = { createdAt: "desc" };
  switch (params.sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    case "bestselling":
      orderBy = { bestSeller: "desc" };
      break;
    default:
      orderBy = { featured: "desc" };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { brand: true, images: true },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, pages: Math.ceil(total / limit) };
}

export async function createProduct(data: any) {
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const slug = slugify(parsed.data.name);
  const sku = parsed.data.sku;

  try {
    const product = await prisma.product.create({
      data: { ...parsed.data, slug },
    });
    revalidatePath("/shop");
    return { success: true, product };
  } catch {
    return { success: false, message: "Product creation failed." };
  }
}

export async function updateProduct(id: string, data: any) {
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    const product = await prisma.product.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath("/shop");
    revalidatePath(`/products/${product.slug}`);
    return { success: true, product };
  } catch {
    return { success: false, message: "Product update failed." };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/shop");
    return { success: true };
  } catch {
    return { success: false, message: "Product deletion failed." };
  }
}
