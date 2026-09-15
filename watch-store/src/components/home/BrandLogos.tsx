import Link from "next/link";
import Image from "next/image";
import { getBrands } from "@/actions/brands";
import SectionTitle from "./SectionTitle";

export default async function BrandLogos() {
  const brands = await getBrands();
  return (
    <section className="border-y border-ink/10 bg-cream py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle title="Our Maisons" subtitle="Partner Brands" />
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group flex h-32 flex-col items-center justify-center border border-ink/5 bg-ivory p-4 transition hover:border-brass/40"
            >
              {brand.logo ? (
                <Image src={brand.logo} alt={brand.name} width={80} height={40} className="opacity-60 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />
              ) : (
                <span className="font-display text-lg font-light uppercase tracking-widest">{brand.name}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
