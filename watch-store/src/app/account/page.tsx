export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">My Account</h1>
        <p className="mb-10 text-stone">Welcome back, {user?.name}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/account/orders" className="border border-ink/10 bg-ivory p-8 transition hover:border-brass/40">
            <h2 className="font-display text-2xl font-light">Orders</h2>
            <p className="mt-2 text-sm text-stone">View your order history and track shipments.</p>
          </Link>
          <Link href="/account/addresses" className="border border-ink/10 bg-ivory p-8 transition hover:border-brass/40">
            <h2 className="font-display text-2xl font-light">Addresses</h2>
            <p className="mt-2 text-sm text-stone">Manage shipping and billing addresses.</p>
          </Link>
          <Link href="/wishlist" className="border border-ink/10 bg-ivory p-8 transition hover:border-brass/40">
            <h2 className="font-display text-2xl font-light">Wishlist</h2>
            <p className="mt-2 text-sm text-stone">Watches you have saved for later.</p>
          </Link>
          <Link href="/" className="border border-ink/10 bg-ivory p-8 transition hover:border-brass/40">
            <h2 className="font-display text-2xl font-light">Continue Shopping</h2>
            <p className="mt-2 text-sm text-stone">Explore the latest arrivals.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
