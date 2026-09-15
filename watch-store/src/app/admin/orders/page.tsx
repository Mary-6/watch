export const dynamic = "force-dynamic";

import Link from "next/link";
import { getAllOrders } from "@/actions/orders";
import { updateOrderStatus } from "@/actions/orders";
import { format } from "date-fns";

export default async function AdminOrdersPage() {
  const { orders } = await getAllOrders({});

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Orders</h1>
      <div className="overflow-x-auto border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Date</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-ink/10 last:border-b-0">
                <td className="p-4 font-medium">{o.orderNumber}</td>
                <td className="p-4 text-stone">{o.user?.email ?? "Guest"}</td>
                <td className="p-4">${o.total.toFixed(2)}</td>
                <td className="p-4">{o.status}</td>
                <td className="p-4">{o.paymentStatus}</td>
                <td className="p-4">{format(new Date(o.createdAt), "MMM d, yyyy")}</td>
                <td className="p-4">
                  <Link href={`/admin/orders/${o.id}`} className="text-stone hover:text-brass">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
