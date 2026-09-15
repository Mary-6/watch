export const dynamic = "force-dynamic";

import { getCategories, deleteCategory } from "@/actions/categories";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Categories</h1>
      <div className="overflow-x-auto border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10">
            <tr><th className="p-4">Name</th><th className="p-4">Slug</th><th className="p-4">Status</th><th className="p-4"></th></tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-ink/10 last:border-b-0">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-stone">{c.slug}</td>
                <td className="p-4">{c.status}</td>
                <td className="p-4">
                  <form action={async () => { "use server"; await deleteCategory(c.id); }}>
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
