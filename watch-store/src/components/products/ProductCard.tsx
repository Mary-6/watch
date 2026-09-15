import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { addToWishlist } from "@/actions/wishlist";
import { addToCart } from "@/actions/cart";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    salePrice: number | null;
    stock: number;
    images: { imageUrl: string; isPrimary: boolean }[];
    brand: { name: string };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return (
    <div className="group relative flex flex-col">
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-ivory">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink/5 text-stone">No image</div>
        )}
        <div className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-3 bg-cream/95 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <form
            action={async () => {
              await addToCart(product.id, 1);
            }}
          >
            <button
              type="submit"
              disabled={product.stock <= 0}
              className="rounded border border-ink/10 bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cream hover:bg-brass disabled:opacity-50"
            >
              Add to Cart
            </button>
          </form>
          <form
            action={async () => {
              await addToWishlist(product.id);
            }}
          >
            <button
              type="submit"
              aria-label="Add to wishlist"
              className="rounded border border-ink/10 p-2 hover:text-brass"
            >
              <Heart className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Link>
      <div className="mt-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone">{product.brand.name}</p>
        <Link href={`/products/${product.slug}`} className="mt-1 block font-display text-lg font-medium">
          {product.name}
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          {product.salePrice ? (
            <>
              <span className="text-stone line-through">{formatCurrency(product.price)}</span>
              <span className="font-medium text-brass">{formatCurrency(product.salePrice)}</span>
            </>
          ) : (
            <span className="font-medium">{formatCurrency(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
