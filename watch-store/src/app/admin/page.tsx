export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [orders, products, users, revenue] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { user: true } }),
    prisma.product.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  const stats = [
    { label: "Revenue", value: `$${(revenue._sum.total ?? 0).toFixed(2)}` },
    { label: "Products", value: products },
    { label: "Customers", value: users },
    { label: "Orders", value: orders.length },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Dashboard</h1>
      <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-ink/10 bg-ivory p-6">
            <p className="text-xs uppercase tracking-widest text-stone">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-medium">{s.value}</p>
          </div>
        ))}
      </div>
      <h2 className="mb-4 font-display text-2xl font-light">Recent Orders</h2>
      <div className="border border-ink/10 bg-ivory">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between border-b border-ink/10 p-4 last:border-b-0">
            <div>
              <p className="font-medium">{o.orderNumber}</p>
              <p className="text-sm text-stone">{o.user?.email ?? "Guest"}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${o.total.toFixed(2)}</p>
              <p className="text-sm text-stone">{o.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
