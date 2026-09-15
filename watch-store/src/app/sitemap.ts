import { MetadataRoute } from "next";
import { getBrands } from "@/actions/brands";
import { getCategories } from "@/actions/categories";
import { getProducts } from "@/actions/products";
import { getPublishedPosts } from "@/actions/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = ["/", "/shop", "/brands", "/about", "/contact", "/blog", "/cart", "/checkout"];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  try {
    const [brands, categories, productList, posts] = await Promise.all([
      getBrands(),
      getCategories(),
      getProducts({ page: 1, limit: 1000 }),
      getPublishedPosts(100),
    ]);
    productList.products.forEach((p) => entries.push({ url: `${base}/products/${p.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 }));
    brands.forEach((b) => entries.push({ url: `${base}/brands/${b.slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 }));
    categories.forEach((c) => entries.push({ url: `${base}/shop?category=${c.slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 }));
    posts.forEach((p) => entries.push({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt ?? new Date(), changeFrequency: "monthly", priority: 0.6 }));
  } catch {
    // Database not available during build; return static routes only
  }

  return entries;
}
