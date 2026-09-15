export const dynamic = "force-dynamic";

import { getBrands, deleteBrand } from "@/actions/brands";

export default async function AdminBrandsPage() {
  const brands = await getBrands();

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Brands</h1>
      <div className="overflow-x-auto border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10">
            <tr><th className="p-4">Name</th><th className="p-4">Slug</th><th className="p-4">Status</th><th className="p-4"></th></tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-b border-ink/10 last:border-b-0">
                <td className="p-4 font-medium">{b.name}</td>
                <td className="p-4 text-stone">{b.slug}</td>
                <td className="p-4">{b.status}</td>
                <td className="p-4">
                  <form action={async () => { "use server"; await deleteBrand(b.id); }}>
                    <button type="submit" className="text-red-700 hover:text-red-900">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
