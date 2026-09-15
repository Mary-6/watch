"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validations";
import { calculateSubtotal, calculateDiscount, calculateShipping, calculateTotal } from "@/lib/pricing";
import { generateSessionId, generateOrderNumber } from "@/lib/utils";
import { getCart } from "./cart";

export async function createCheckoutOrder(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = checkoutSchema.safeParse(data);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const cart = await getCart();
  if (!cart || cart.cartItems.length === 0) return { success: false, message: "Cart is empty" };

  const productIds = cart.cartItems.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of cart.cartItems) {
    const product = productMap.get(item.productId);
    if (!product) return { success: false, message: "Product not found" };
    if (product.stock < item.quantity) return { success: false, message: `Insufficient stock for ${product.name}` };
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const shippingName = `${parsed.data.firstName} ${parsed.data.lastName}`;
  const subtotal = calculateSubtotal(cart.cartItems.map((i) => ({ price: i.price, quantity: i.quantity })));
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, 0, shipping);

  const orderNumber = generateOrderNumber();

  await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        orderNumber,
        status: "PENDING",
        paymentStatus: "PENDING",
        subtotal,
        shippingAmount: shipping,
        discountAmount: 0,
        total,
        shippingName,
        shippingEmail: parsed.data.email,
        shippingPhone: parsed.data.phone,
        shippingCountry: parsed.data.country,
        shippingCity: parsed.data.city,
        shippingAddress: parsed.data.address,
        shippingPostalCode: parsed.data.postalCode,
        notes: parsed.data.notes,
      },
    });

    for (const item of cart.cartItems) {
      const product = productMap.get(item.productId)!;
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          productName: product.name,
          productPrice: product.price,
          quantity: item.quantity,
          subtotal: product.price * item.quantity,
        },
      });
      await tx.product.update({
        where: { id: product.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    if (cart.sessionId) {
      const cookieStore = await cookies();
      cookieStore.delete("cart_session_id");
    }
  });

  revalidatePath("/cart");
  return { success: true, orderNumber };
}
