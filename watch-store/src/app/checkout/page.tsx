export const dynamic = "force-dynamic";

import { getCart } from "@/actions/cart";
import { createCheckoutOrder } from "@/actions/checkout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const [cart, session] = await Promise.all([getCart(), getServerSession(authOptions)]);
  if (!cart || cart.cartItems.length === 0) return <p className="py-24 text-center text-stone">Your cart is empty.</p>;

  const subtotal = cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : subtotal >= 1500 ? 25 : 45;
  const total = subtotal + shipping;

  async function handleCheckout(formData: FormData) {
    "use server";
    const result = await createCheckoutOrder(formData);
    if (result.success && result.orderNumber) {
      redirect(`/account/orders?success=${result.orderNumber}`);
    }
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">Checkout</h1>
        <p className="mb-10 text-stone">Complete your order below.</p>
        <div className="grid gap-12 lg:grid-cols-3">
          <form action={handleCheckout} className="space-y-8 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <div><label className="text-xs font-semibold uppercase tracking-widest text-stone">First Name</label><input name="firstName" required className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
              <div><label className="text-xs font-semibold uppercase tracking-widest text-stone">Last Name</label><input name="lastName" required className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
              <div><label className="text-xs font-semibold uppercase tracking-widest text-stone">Email</label><input name="email" type="email" required className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
              <div><label className="text-xs font-semibold uppercase tracking-widest text-stone">Phone</label><input name="phone" required className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
              <div><label className="text-xs font-semibold uppercase tracking-widest text-stone">Country</label><input name="country" required className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
              <div><label className="text-xs font-semibold uppercase tracking-widest text-stone">City</label><input name="city" required className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
              <div className="md:col-span-2"><label className="text-xs font-semibold uppercase tracking-widest text-stone">Address</label><input name="address" required className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
              <div><label className="text-xs font-semibold uppercase tracking-widest text-stone">Postal Code</label><input name="postalCode" required className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
              <div className="md:col-span-2"><label className="text-xs font-semibold uppercase tracking-widest text-stone">Notes</label><textarea name="notes" rows={3} className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" /></div>
            </div>
            <button type="submit" className="bg-ink px-10 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-brass">
              Place Order
            </button>
          </form>
          <div className="border border-ink/10 bg-ivory p-8">
            <h2 className="mb-6 font-display text-2xl font-light">Order Summary</h2>
            <div className="space-y-3 text-sm">
              {cart.cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-stone">{item.product.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-ink/10 pt-3">
                <div className="flex justify-between"><span className="text-stone">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-stone">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="mt-3 flex justify-between font-display text-xl font-medium"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
            <p className="mt-6 text-xs text-stone">Payment integration with Stripe, Paystack, or Flutterwave can be connected by setting the corresponding environment variables.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
