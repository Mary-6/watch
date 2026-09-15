export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getWishlistWithItems, removeFromWishlist } from "@/actions/wishlist";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/actions/cart";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const wishlist = await getWishlistWithItems(session.user.id);
  if (!wishlist || wishlist.items.length === 0) {
    return (
      <section className="py-24 text-center">
        <h1 className="font-display text-4xl font-light">Wishlist</h1>
        <p className="mt-4 text-stone">Your wishlist is empty.</p>
        <Link href="/shop" className="mt-6 inline-block text-sm font-semibold uppercase tracking-widest hover:text-brass">Continue Shopping</Link>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">Wishlist</h1>
        <p className="mb-10 text-stone">Watches you are watching closely.</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist.items.map((item) => {
            const image = item.product.images[0]?.imageUrl;
            return (
              <div key={item.id} className="group">
                <Link href={`/products/${item.product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-ivory">
                  {image ? <Image src={image} alt={item.product.name} fill className="object-cover" sizes="25vw" /> : null}
                </Link>
                <p className="mt-2 text-xs text-stone">{item.product.brand.name}</p>
                <Link href={`/products/${item.product.slug}`} className="font-display text-lg">{item.product.name}</Link>
                <div className="mt-3 flex gap-2">
                  <form action={async () => { await addToCart(item.product.id, 1); }}>
                    <button type="submit" className="rounded border border-ink/10 px-3 py-2 text-xs uppercase tracking-widest hover:border-brass hover:text-brass">Move to Cart</button>
                  </form>
                  <form action={async () => { await removeFromWishlist(item.id); }}>
                    <button type="submit" className="rounded border border-ink/10 px-3 py-2 text-xs uppercase tracking-widest hover:border-brass hover:text-brass">Remove</button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
