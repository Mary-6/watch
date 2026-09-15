export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/actions/brands";
import ProductGrid from "@/components/products/ProductGrid";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "Brand not found | Aurent" };
  return {
    title: `${brand.name} | Aurent`,
    description: brand.description?.slice(0, 160) ?? `Shop ${brand.name} at Aurent`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">{brand.name}</h1>
        <p className="mb-12 max-w-2xl text-stone">{brand.description}</p>
        <ProductGrid products={brand.products as any} />
      </div>
    </section>
  );
}
