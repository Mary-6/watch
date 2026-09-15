"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getWishlist(userId: string) {
  const wishlist = await prisma.wishlist.findUnique({ where: { userId } });
  if (wishlist) return wishlist;
  return await prisma.wishlist.create({ data: { userId } });
}

export async function addToWishlist(productId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { success: false, message: "Please sign in" };

  const wishlist = await getWishlist(session.user.id);
  try {
    await prisma.wishlistItem.create({
      data: { wishlistId: wishlist.id, productId },
    });
    revalidatePath("/wishlist");
    return { success: true, message: "Added to wishlist" };
  } catch {
    return { success: false, message: "Already in wishlist" };
  }
}

export async function removeFromWishlist(itemId: string) {
  await prisma.wishlistItem.delete({ where: { id: itemId } });
  revalidatePath("/wishlist");
  return { success: true, message: "Removed from wishlist" };
}

export async function getWishlistWithItems(userId: string) {
  return prisma.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: { include: { brand: true, images: true } } },
      },
    },
  });
}
