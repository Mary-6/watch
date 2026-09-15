export const dynamic = "force-dynamic";

import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getOrderById } from "@/actions/orders";
import { format } from "date-fns";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">Order {order.orderNumber}</h1>
        <p className="mb-10 text-stone">Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}</p>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-display text-2xl font-light">Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-ink/10 py-4">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-stone">× {item.quantity}</p>
                  </div>
                  <p className="font-medium">${item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 font-display text-2xl font-light">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-stone">Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-stone">Shipping</span><span>${order.shippingAmount.toFixed(2)}</span></div>
              {order.discountAmount > 0 && <div className="flex justify-between"><span className="text-stone">Discount</span><span>${order.discountAmount.toFixed(2)}</span></div>}
              <div className="border-t border-ink/10 pt-2"><div className="flex justify-between font-display text-xl font-medium"><span>Total</span><span>${order.total.toFixed(2)}</span></div></div>
            </div>
            <div className="mt-8">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone">Shipping to</h3>
              <p className="text-sm">{order.shippingName}</p>
              <p className="text-sm text-stone">{order.shippingAddress}, {order.shippingCity}, {order.shippingCountry}, {order.shippingPostalCode}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
