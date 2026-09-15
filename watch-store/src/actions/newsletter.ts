"use server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";

export async function subscribeNewsletter(email: string) {
  const parsed = newsletterSchema.safeParse({ email });
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };

  try {
    await prisma.newsletterSubscriber.create({ data: { email: parsed.data.email } });
    return { success: true, message: "Thank you for subscribing." };
  } catch {
    return { success: false, message: "This email is already subscribed." };
  }
}
