"use client";

import { formatCurrency } from "@/lib/utils";
import { calculateSubtotal, calculateShipping, calculateTotal } from "@/lib/pricing";
import Link from "next/link";
import { clearCart } from "@/actions/cart";

interface CartSummaryProps {
  items: { price: number; quantity: number }[];
  discount?: number;
}

export default function CartSummary({ items, discount = 0 }: CartSummaryProps) {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, discount, shipping);

  return (
    <div className="border border-ink/10 bg-ivory p-8">
      <h2 className="mb-6 font-display text-2xl font-light">Order Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-stone">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
        {discount > 0 && <div className="flex justify-between"><span className="text-stone">Discount</span><span className="text-brass">-{formatCurrency(discount)}</span></div>}
        <div className="flex justify-between"><span className="text-stone">Shipping</span><span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span></div>
        <div className="border-t border-ink/10 pt-3">
          <div className="flex justify-between font-display text-xl font-medium">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      <Link
        href="/checkout"
        className="mt-6 block w-full bg-ink py-4 text-center text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-brass"
      >
        Proceed to Checkout
      </Link>
      <form action={async () => { await clearCart(); }}>
        <button type="submit" className="mt-4 w-full text-xs uppercase tracking-widest text-stone hover:text-brass">
          Clear Cart
        </button>
      </form>
    </div>
  );
}
