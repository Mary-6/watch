export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getOrders } from "@/actions/orders";
import Link from "next/link";
import { format } from "date-fns";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const orders = await getOrders();

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">My Orders</h1>
        <p className="mb-10 text-stone">Track and review your orders.</p>
        {orders.length === 0 ? (
          <p className="text-stone">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex flex-col justify-between border border-ink/10 bg-ivory p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-lg font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-stone">{format(new Date(order.createdAt), "MMMM d, yyyy")}</p>
                  <p className="text-sm text-stone">{order.orderItems.length} items · {order.status}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <p className="font-display text-xl font-medium">${order.total.toFixed(2)}</p>
                  <Link href={`/account/orders/${order.id}`} className="text-xs uppercase tracking-widest text-stone hover:text-brass">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
