"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: { role: "CUSTOMER" },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
  ]);
  return { users, total, pages: Math.ceil(total / limit) };
}
