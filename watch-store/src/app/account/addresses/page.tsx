export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function deleteAddress(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.address.delete({ where: { id } });
  revalidatePath("/account/addresses");
}

export default async function AddressesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const addresses = await prisma.address.findMany({ where: { userId: session.user.id } });

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">My Addresses</h1>
        <p className="mb-10 text-stone">Manage your saved addresses.</p>
        {addresses.length === 0 ? (
          <p className="text-stone">No saved addresses.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {addresses.map((address) => (
              <div key={address.id} className="border border-ink/10 bg-ivory p-6">
                <p className="font-medium">{address.name}</p>
                <p className="text-sm text-stone">{address.address}</p>
                <p className="text-sm text-stone">{address.city}, {address.country}, {address.postalCode}</p>
                {address.isDefault && <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-widest text-brass">Default</span>}
                <form action={deleteAddress} className="mt-4">
                  <input type="hidden" name="id" value={address.id} />
                  <button type="submit" className="text-xs uppercase tracking-widest text-stone hover:text-brass">Delete</button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
