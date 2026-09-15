"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function registerUser(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { success: false, message: "An account with this email already exists" };

  const password = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({
    data: { name: parsed.data.name, email: parsed.data.email, password, role: "CUSTOMER" },
  });

  return { success: true, user };
}
