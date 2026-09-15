export const dynamic = "force-dynamic";

import { getUsers } from "@/actions/users";

export default async function AdminCustomersPage() {
  const { users } = await getUsers();

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Customers</h1>
      <div className="overflow-x-auto border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-ink/10 last:border-b-0">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4 text-stone">{u.email}</td>
                <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
