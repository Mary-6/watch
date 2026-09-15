import Link from "next/link";
import { getBestsellers } from "@/actions/products";
import ProductGrid from "@/components/products/ProductGrid";
import SectionTitle from "./SectionTitle";

export default async function Bestsellers() {
  const products = await getBestsellers();
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle title="Bestsellers" subtitle="Most Loved" />
        <ProductGrid products={products as any} />
        <div className="mt-12 text-center">
          <Link href="/shop?bestSeller=true" className="text-sm font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:text-brass hover:underline">
            Shop Bestsellers
          </Link>
        </div>
      </div>
    </section>
  );
}
