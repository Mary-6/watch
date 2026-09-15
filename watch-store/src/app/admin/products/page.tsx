export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/actions/products";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { brand: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl font-light">Products</h1>
        <Link href="/admin/products/new" className="bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-widest text-cream hover:bg-brass">Add Product</Link>
      </div>
      <div className="overflow-x-auto border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-ink/10 last:border-b-0">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-stone">{p.brand.name}</td>
                <td className="p-4">${p.price.toFixed(2)}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">{p.status}</td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <Link href={`/admin/products/${p.id}/edit`} className="text-stone hover:text-brass">Edit</Link>
                    <form action={async () => { "use server"; await deleteProduct(p.id); }}>
                      <button type="submit" className="text-red-700 hover:text-red-900">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
