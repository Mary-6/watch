export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { getBrands } from "@/actions/brands";

export default async function BrandsPage() {
  const brands = await getBrands();
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">Our Maisons</h1>
        <p className="mb-12 text-stone">Independent ateliers and established houses curated for discerning collectors.</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group border border-ink/10 bg-ivory p-8 transition hover:border-brass/40"
            >
              {brand.logo ? (
                <Image src={brand.logo} alt={brand.name} width={100} height={60} className="mb-4 opacity-60 grayscale transition group-hover:opacity-100" />
              ) : null}
              <h2 className="font-display text-2xl font-light">{brand.name}</h2>
              <p className="mt-2 text-sm text-stone line-clamp-2">{brand.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
