"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { generateSessionId } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function getOrCreateCart() {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session_id")?.value ?? generateSessionId();

  if (!cookieStore.get("cart_session_id")) {
    cookieStore.set("cart_session_id", sessionId, { httpOnly: true, maxAge: 60 * 60 * 24 * 30 });
  }

  if (session?.user?.id) {
    const existing = await prisma.cart.findUnique({ where: { userId: session.user.id } });
    if (existing) return existing;
    const guestCart = await prisma.cart.findUnique({ where: { sessionId } });
    if (guestCart) {
      return await prisma.cart.update({ where: { id: guestCart.id }, data: { userId: session.user.id } });
    }
    return await prisma.cart.create({ data: { userId: session.user.id } });
  }

  const existing = await prisma.cart.findUnique({ where: { sessionId } });
  if (existing) return existing;
  return await prisma.cart.create({ data: { sessionId } });
}

export async function addToCart(productId: string, quantity: number) {
  const cart = await getOrCreateCart();
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return { success: false, message: "Product not found" };
  if (product.stock < quantity) return { success: false, message: "Not enough stock" };

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      return { success: false, message: "Not enough stock" };
    }
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity, price: product.price },
    });
  }

  revalidatePath("/cart");
  return { success: true, message: "Added to cart" };
}

export async function updateCartItem(itemId: string, quantity: number) {
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { product: true },
  });
  if (!item) return { success: false, message: "Item not found" };
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
  } else if (quantity > item.product.stock) {
    return { success: false, message: "Not enough stock" };
  } else {
    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
  }
  revalidatePath("/cart");
  return { success: true, message: "Cart updated" };
}

export async function removeFromCart(itemId: string) {
  await prisma.cartItem.delete({ where: { id: itemId } });
  revalidatePath("/cart");
  return { success: true, message: "Removed from cart" };
}

export async function clearCart() {
  const cart = await getOrCreateCart();
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  revalidatePath("/cart");
  return { success: true, message: "Cart cleared" };
}

export async function getCart() {
  const cart = await getOrCreateCart();
  return prisma.cart.findUnique({
    where: { id: cart.id },
    include: {
      cartItems: { include: { product: { include: { brand: true, images: true } } } },
    },
  });
}

export async function getCartCount() {
  const cart = await getCart();
  return cart?.cartItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
}
