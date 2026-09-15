export const dynamic = "force-dynamic";

import { getCart } from "@/actions/cart";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Link from "next/link";

export default async function CartPage() {
  const cart = await getCart();

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">Your Cart</h1>
        <p className="mb-10 text-stone">Review the watches in your collection.</p>
        {!cart || cart.cartItems.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-stone">Your cart is empty.</p>
            <Link href="/shop" className="mt-4 inline-block text-sm font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:text-brass hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {cart.cartItems.map((item) => (
                <CartItem key={item.id} item={item as any} />
              ))}
            </div>
            <div>
              <CartSummary
                items={cart.cartItems.map((item) => ({ price: item.price, quantity: item.quantity }))}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
