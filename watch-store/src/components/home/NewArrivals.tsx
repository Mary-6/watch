import Link from "next/link";
import { getNewArrivals } from "@/actions/products";
import ProductGrid from "@/components/products/ProductGrid";
import SectionTitle from "./SectionTitle";

export default async function NewArrivals() {
  const products = await getNewArrivals();
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle title="New Arrivals" subtitle="Just Landed" />
        <ProductGrid products={products as any} />
        <div className="mt-12 text-center">
          <Link href="/shop?newArrival=true" className="text-sm font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:text-brass hover:underline">
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
