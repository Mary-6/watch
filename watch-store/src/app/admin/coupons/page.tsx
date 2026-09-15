export const dynamic = "force-dynamic";

import { getCoupons, deleteCoupon } from "@/actions/coupons";

export default async function AdminCouponsPage() {
  const coupons = await getCoupons();

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Coupons</h1>
      <div className="overflow-x-auto border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10">
            <tr>
              <th className="p-4">Code</th>
              <th className="p-4">Type</th>
              <th className="p-4">Value</th>
              <th className="p-4">Uses</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b border-ink/10 last:border-b-0">
                <td className="p-4 font-medium">{c.code}</td>
                <td className="p-4 text-stone">{c.type}</td>
                <td className="p-4">{c.value}</td>
                <td className="p-4">{c.usedCount} {c.maximumUses ? `/ ${c.maximumUses}` : ""}</td>
                <td className="p-4">{c.status}</td>
                <td className="p-4">
                  <form action={async () => { "use server"; await deleteCoupon(c.id); }}>
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
