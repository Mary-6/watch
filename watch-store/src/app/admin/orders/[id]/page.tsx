export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "@/actions/orders";

async function updateStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const paymentStatus = formData.get("paymentStatus") as string;
  await updateOrderStatus(id, status, paymentStatus);
}

interface OrderDetailProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: OrderDetailProps) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { orderItems: true, user: true },
  });
  if (!order) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Order {order.orderNumber}</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-2xl font-light">Items</h2>
          <div className="border border-ink/10 bg-ivory">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b border-ink/10 p-4 last:border-b-0">
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
          <h2 className="mb-4 font-display text-2xl font-light">Update Status</h2>
          <form action={updateStatus} className="space-y-4 border border-ink/10 bg-ivory p-6">
            <input type="hidden" name="id" value={order.id} />
            <div>
              <label className="text-xs uppercase tracking-widest text-stone">Order Status</label>
              <select name="status" defaultValue={order.status} className="mt-2 w-full border-b border-ink/10 bg-transparent py-2 outline-none">
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-stone">Payment Status</label>
              <select name="paymentStatus" defaultValue={order.paymentStatus} className="mt-2 w-full border-b border-ink/10 bg-transparent py-2 outline-none">
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="FAILED">FAILED</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </div>
            <button type="submit" className="bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-widest text-cream hover:bg-brass">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
