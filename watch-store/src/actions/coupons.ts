"use server";

import { prisma } from "@/lib/prisma";
import { couponSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getCoupons() {
  return prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getCouponByCode(code: string) {
  return prisma.coupon.findUnique({ where: { code } });
}

export async function validateCoupon(code: string, subtotal: number) {
  const coupon = await getCouponByCode(code);
  if (!coupon || coupon.status !== "ACTIVE") return { success: false, message: "Invalid coupon" };
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return { success: false, message: "Coupon expired" };
  if (coupon.minimumAmount && subtotal < coupon.minimumAmount) return { success: false, message: `Minimum order of ${coupon.minimumAmount} required` };
  if (coupon.maximumUses !== null && coupon.usedCount >= coupon.maximumUses) return { success: false, message: "Coupon limit reached" };
  return { success: true, coupon };
}

export async function createCoupon(data: any) {
  const parsed = couponSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };
  const coupon = await prisma.coupon.create({ data: parsed.data });
  revalidatePath("/admin/coupons");
  return { success: true, coupon };
}

export async function updateCoupon(id: string, data: any) {
  const parsed = couponSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };
  const coupon = await prisma.coupon.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/coupons");
  return { success: true, coupon };
}

export async function deleteCoupon(id: string) {
  await prisma.coupon.delete({ where: { id } });
  revalidatePath("/admin/coupons");
  return { success: true };
}
