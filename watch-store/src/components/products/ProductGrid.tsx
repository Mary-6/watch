import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: {
    id: string;
    slug: string;
    name: string;
    price: number;
    salePrice: number | null;
    stock: number;
    images: { imageUrl: string; isPrimary: boolean }[];
    brand: { name: string };
  }[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) return <p className="py-12 text-center text-stone">No watches found.</p>;
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
