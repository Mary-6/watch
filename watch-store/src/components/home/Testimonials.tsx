import { getBestsellers } from "@/actions/products";
import Rating from "@/components/reviews/Rating";

export default async function Testimonials() {
  const products = await getBestsellers();
  const reviews = products.slice(0, 3).flatMap((p) => p.reviews ?? []).slice(0, 3);

  return (
    <section className="bg-ink py-24 text-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">Collector Words</p>
          <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">What Our Clients Say</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {(reviews.length > 0 ? reviews : [1, 2, 3].map((_, i) => ({ id: i, rating: 5, title: "Outstanding experience", comment: "Aurent made the entire process seamless. The watch arrived beautifully packaged and exactly as described.", user: { name: "Collector" } }))).map((r: any, i) => (
            <div key={r.id ?? i} className="border border-cream/10 p-8">
              <Rating value={r.rating ?? 5} />
              <h3 className="mt-4 font-display text-xl font-medium">{r.title ?? "Outstanding"}</h3>
              <p className="mt-3 text-sm text-cream/70">{r.comment ?? "Aurent made the entire process seamless."}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brass-light">— {r.user?.name ?? "A Client"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
