export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions/products";
import ProductGallery from "@/components/products/ProductGallery";
import PriceDisplay from "@/components/products/PriceDisplay";
import Rating from "@/components/reviews/Rating";
import ReviewCard from "@/components/reviews/ReviewCard";
import QuantitySelector from "@/components/products/QuantitySelector";
import { addToCart } from "@/actions/cart";
import { addToWishlist } from "@/actions/wishlist";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found | Aurent" };
  return {
    title: `${product.name} | Aurent`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} productName={product.name} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">{product.brand.name}</p>
            <h1 className="mt-2 font-display text-4xl font-light md:text-5xl">{product.name}</h1>
            <p className="mt-2 text-xs text-stone">SKU: {product.sku}</p>
            <div className="mt-6">
              <PriceDisplay price={product.price} salePrice={product.salePrice} size="lg" />
            </div>
            <p className="mt-6 text-stone">{product.description}</p>

            <div className="mt-8">
              <form
                action={async (formData) => {
                  "use server";
                  const qty = parseInt(formData.get("quantity") as string, 10) || 1;
                  await addToCart(product.id, qty);
                }}
                className="flex flex-wrap items-end gap-4"
              >
                <QuantitySelectorClient />
                <button
                  type="submit"
                  disabled={product.stock <= 0}
                  className="h-12 border border-ink bg-ink px-8 text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-brass disabled:opacity-40"
                >
                  Add to Cart
                </button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await addToWishlist(product.id);
                }}
                className="mt-4"
              >
                <button type="submit" className="text-xs font-semibold uppercase tracking-widest underline-offset-4 hover:text-brass hover:underline">
                  Add to Wishlist
                </button>
              </form>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-ink/10 pt-8 text-sm">
              <div><span className="text-stone">Movement</span><p className="font-medium">{product.movement ?? "—"}</p></div>
              <div><span className="text-stone">Case</span><p className="font-medium">{product.caseMaterial ?? "—"} {product.caseDiameter}</p></div>
              <div><span className="text-stone">Dial</span><p className="font-medium">{product.dial ?? "—"}</p></div>
              <div><span className="text-stone">Crystal</span><p className="font-medium">{product.crystal ?? "—"}</p></div>
              <div><span className="text-stone">Water resistance</span><p className="font-medium">{product.waterResistance ?? "—"}</p></div>
              <div><span className="text-stone">Strap</span><p className="font-medium">{product.strap ?? "—"}</p></div>
              <div><span className="text-stone">Warranty</span><p className="font-medium">{product.warranty ?? "—"}</p></div>
              <div><span className="text-stone">Stock</span><p className="font-medium">{product.stock} available</p></div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-ink/10 pt-12">
          <h2 className="mb-8 font-display text-3xl font-light">Reviews</h2>
          {product.reviews.length === 0 ? (
            <p className="text-stone">No reviews yet.</p>
          ) : (
            <div>
              <div className="mb-6">
                <Rating
                  value={product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length}
                  count={product.reviews.length}
                />
              </div>
              {product.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function QuantitySelectorClient() {
  return (
    <div className="flex h-12 items-center border border-ink/10">
      <input name="quantity" type="number" defaultValue={1} min={1} max={10} className="h-full w-20 border-none bg-transparent px-4 text-center text-sm outline-none" />
    </div>
  );
}
