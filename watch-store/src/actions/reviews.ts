"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validations";

export async function createReview(productId: string, data: { rating: number; title: string; comment: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { success: false, message: "Please sign in" };

  const parsed = reviewSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  await prisma.review.create({
    data: {
      productId,
      userId: session.user.id,
      ...parsed.data,
      status: "PENDING",
    },
  });
  revalidatePath(`/products/${productId}`);
  return { success: true, message: "Review submitted for approval." };
}

export async function getReviews() {
  return prisma.review.findMany({
    include: { product: true, user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function approveReview(id: string) {
  await prisma.review.update({ where: { id }, data: { status: "APPROVED" } });
  return { success: true };
}

export async function rejectReview(id: string) {
  await prisma.review.update({ where: { id }, data: { status: "REJECTED" } });
  return { success: true };
}
