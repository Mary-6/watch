"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/products";

const inputs = [
  { name: "name", label: "Name" },
  { name: "sku", label: "SKU" },
  { name: "price", label: "Price", type: "number" },
  { name: "salePrice", label: "Sale Price", type: "number" },
  { name: "stock", label: "Stock", type: "number" },
  { name: "gender", label: "Gender" },
  { name: "movement", label: "Movement" },
  { name: "caseMaterial", label: "Case Material" },
  { name: "caseDiameter", label: "Case Diameter" },
  { name: "dial", label: "Dial" },
  { name: "crystal", label: "Crystal" },
  { name: "waterResistance", label: "Water Resistance" },
  { name: "strap", label: "Strap" },
  { name: "warranty", label: "Warranty" },
];

export default function NewProductPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

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
    const result = await createProduct(parsed);
    if (result.success) router.push("/admin/products");
    else setMessage(result.message || "Failed to create product");
  };

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Add Product</h1>
      {message && <p className="mb-4 text-red-700">{message}</p>}
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {inputs.map((inp) => (
          <div key={inp.name}>
            <label className="text-xs font-semibold uppercase tracking-widest text-stone">{inp.label}</label>
            <input name={inp.name} type={inp.type ?? "text"} className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-stone">Brand ID</label>
          <input name="brandId" className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-stone">Category ID</label>
          <input name="categoryId" className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-stone">Description</label>
          <textarea name="description" rows={4} className="mt-2 w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
        </div>
        <div className="flex gap-4 md:col-span-2">
          <label className="flex items-center gap-2"><input name="featured" type="checkbox" /> Featured</label>
          <label className="flex items-center gap-2"><input name="bestSeller" type="checkbox" /> Bestseller</label>
          <label className="flex items-center gap-2"><input name="newArrival" type="checkbox" /> New Arrival</label>
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream hover:bg-brass">Create Product</button>
        </div>
      </form>
    </div>
  );
}
