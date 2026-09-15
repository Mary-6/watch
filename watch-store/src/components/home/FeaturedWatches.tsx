import Link from "next/link";
import { getFeaturedProducts } from "@/actions/products";
import ProductGrid from "@/components/products/ProductGrid";
import SectionTitle from "./SectionTitle";

export default async function FeaturedWatches() {
  const products = await getFeaturedProducts();
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle title="Featured Watches" subtitle="Curated Selection" />
        <ProductGrid products={products as any} />
        <div className="mt-12 text-center">
          <Link href="/shop" className="text-sm font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:text-brass hover:underline">
            View All Watches
          </Link>
        </div>
      </div>
    </section>
  );
}
