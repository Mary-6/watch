"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface FilterOption {
  id: string;
  name: string;
}

interface ShopFiltersProps {
  brands: FilterOption[];
  categories: FilterOption[];
  counts: {
    minPrice?: number;
    maxPrice?: number;
  };
}

export default function ShopFilters({ brands, categories }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    startTransition(() => {
      router.push(`/shop?${params.toString()}`);
    });
  };

  const filters = {
    brand: searchParams.get("brand") ?? "",
    category: searchParams.get("category") ?? "",
    gender: searchParams.get("gender") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    sort: searchParams.get("sort") ?? "featured",
  };

  return (
    <aside className="space-y-8 border-r border-ink/10 pr-6 lg:col-span-1">
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Sort</h3>
        <select
          value={filters.sort}
          onChange={(e) => update("sort", e.target.value)}
          className="w-full border-b border-ink/10 bg-transparent py-2 text-sm outline-none focus:border-brass"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="bestselling">Best Selling</option>
        </select>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Brand</h3>
        <div className="space-y-2">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => update("brand", filters.brand === b.id ? "" : b.id)}
              className={`block text-sm transition hover:text-brass ${filters.brand === b.id ? "font-semibold text-brass" : "text-stone"}`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Category</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => update("category", filters.category === c.id ? "" : c.id)}
              className={`block text-sm transition hover:text-brass ${filters.category === c.id ? "font-semibold text-brass" : "text-stone"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Gender</h3>
        <div className="space-y-2">
          {["MEN", "WOMEN", "UNISEX"].map((g) => (
            <button
              key={g}
              onClick={() => update("gender", filters.gender === g ? "" : g)}
              className={`block text-sm capitalize transition hover:text-brass ${filters.gender === g ? "font-semibold text-brass" : "text-stone"}`}
            >
              {g.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">Price</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            className="w-full border-b border-ink/10 bg-transparent py-2 text-sm outline-none placeholder:text-stone"
          />
          <span className="text-stone">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="w-full border-b border-ink/10 bg-transparent py-2 text-sm outline-none placeholder:text-stone"
          />
        </div>
      </div>
    </aside>
  );
}
