"use client";

import Image from "next/image";
import Link from "next/link";
import { removeFromCart, updateCartItem } from "@/actions/cart";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      slug: string;
      name: string;
      images: { imageUrl: string }[];
      brand: { name: string };
    };
  };
}

export default function CartItem({ item }: CartItemProps) {
  const image = item.product.images[0]?.imageUrl;
  return (
    <div className="flex items-start gap-4 border-b border-ink/10 py-6">
      <Link href={`/products/${item.product.slug}`} className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-ivory">
        {image ? (
          <Image src={image} alt={item.product.name} fill className="object-cover" sizes="80px" />
        ) : null}
      </Link>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone">{item.product.brand.name}</p>
        <Link href={`/products/${item.product.slug}`} className="font-display text-lg font-medium">
          {item.product.name}
        </Link>
        <p className="text-sm text-stone">{formatCurrency(item.price)}</p>
        <div className="mt-3 flex items-center gap-3">
          <form
            action={async (formData) => {
              const qty = parseInt(formData.get("quantity") as string, 10);
              await updateCartItem(item.id, qty);
            }}
            className="flex items-center gap-2"
          >
            <input name="quantity" type="number" defaultValue={item.quantity} min={1} className="h-8 w-16 border border-ink/10 bg-transparent text-center text-sm" />
            <button type="submit" className="text-xs uppercase tracking-widest text-stone hover:text-brass">Update</button>
          </form>
          <form action={async () => { await removeFromCart(item.id); }}>
            <button type="submit" className="text-xs uppercase tracking-widest text-stone hover:text-brass">Remove</button>
          </form>
        </div>
      </div>
      <div className="text-right">
        <p className="font-display font-medium">{formatCurrency(item.price * item.quantity)}</p>
      </div>
    </div>
  );
}
