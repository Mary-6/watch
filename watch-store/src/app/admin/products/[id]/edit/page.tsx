"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { updateProduct } from "@/actions/products";
import { prisma } from "@/lib/prisma";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const parsed = {
      ...data,
      price: parseFloat(data.price as string),
      salePrice: data.salePrice ? parseFloat(data.salePrice as string) : undefined,
      stock: parseInt(data.stock as string, 10),
      featured: form.has("featured"),
      bestSeller: form.has("bestSeller"),
      newArrival: form.has("newArrival"),
    };
    const result = await updateProduct(id, parsed);
    if (result.success) router.push("/admin/products");
    else setMessage(result.message || "Update failed");
  };

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Edit Product</h1>
      {message && <p className="mb-4 text-red-700">{message}</p>}
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <input name="name" placeholder="Name" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="sku" placeholder="SKU" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="brandId" placeholder="Brand ID" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="categoryId" placeholder="Category ID" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="price" type="number" placeholder="Price" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="salePrice" type="number" placeholder="Sale Price" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="stock" type="number" placeholder="Stock" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="gender" placeholder="Gender (MEN/WOMEN/UNISEX)" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="movement" placeholder="Movement" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="caseMaterial" placeholder="Case Material" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="caseDiameter" placeholder="Case Diameter" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="dial" placeholder="Dial" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="crystal" placeholder="Crystal" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="waterResistance" placeholder="Water Resistance" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="strap" placeholder="Strap" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <input name="warranty" placeholder="Warranty" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        <textarea name="description" placeholder="Description" rows={4} className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass md:col-span-2" />
        <div className="flex gap-4 md:col-span-2">
          <label className="flex items-center gap-2"><input name="featured" type="checkbox" /> Featured</label>
          <label className="flex items-center gap-2"><input name="bestSeller" type="checkbox" /> Bestseller</label>
          <label className="flex items-center gap-2"><input name="newArrival" type="checkbox" /> New Arrival</label>
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream hover:bg-brass">Update Product</button>
        </div>
      </form>
    </div>
  );
}
