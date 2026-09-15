"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getOrders() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];
  return prisma.order.findMany({
    where: { userId: session.user.id },
    include: { orderItems: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  return prisma.order.findFirst({
    where: { id, userId: session.user.id },
    include: { orderItems: true },
  });
}

export async function updateOrderStatus(id: string, status: string, paymentStatus: string) {
  return prisma.order.update({
    where: { id },
    data: { status: status as any, paymentStatus: paymentStatus as any },
  });
}

export async function getAllOrders({ page = 1, limit = 20 }: { page?: number; limit?: number }) {
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      include: { orderItems: true, user: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.order.count(),
  ]);
  return { orders, total, pages: Math.ceil(total / limit) };
}
