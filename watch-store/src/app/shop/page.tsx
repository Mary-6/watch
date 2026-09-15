export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { getProducts } from "@/actions/products";
import { getBrands } from "@/actions/brands";
import { getCategories } from "@/actions/categories";
import ProductGrid from "@/components/products/ProductGrid";
import ShopFilters from "@/components/shop/ShopFilters";
import Pagination from "@/components/ui/Pagination";

type SearchParams = Record<string, string | string[] | undefined>;

async function ShopContent({ searchParams }: { searchParams: SearchParams }) {
  const get = (key: string) => {
    const v = searchParams[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const page = parseInt(get("page") ?? "1", 10);
  const { products, total, pages } = await getProducts({
    page,
    limit: 12,
    search: get("search"),
    brand: get("brand"),
    category: get("category"),
    gender: get("gender"),
    minPrice: get("minPrice") ? parseFloat(get("minPrice")!) : undefined,
    maxPrice: get("maxPrice") ? parseFloat(get("maxPrice")!) : undefined,
    sort: get("sort"),
  });

  const [brands, categories] = await Promise.all([getBrands(), getCategories()]);

  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <ShopFilters brands={brands as any} categories={categories as any} counts={{}} />
      <div className="lg:col-span-3">
        <p className="mb-4 text-sm text-stone">{total} watches</p>
        <ProductGrid products={products as any} />
        <div className="mt-12">
          <Pagination page={page} pages={pages} />
        </div>
      </div>
    </div>
  );
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolved = await searchParams;
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-2 font-display text-4xl font-light md:text-5xl">The Collection</h1>
        <p className="mb-10 text-stone">Discover authenticated luxury timepieces from the world&apos;s finest watchmakers.</p>
        <Suspense fallback={<p className="py-12 text-center text-stone">Loading watches...</p>}>
          <ShopContent searchParams={resolved} />
        </Suspense>
      </div>
    </section>
  );
}
