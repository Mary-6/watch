import Image from "next/image";

export const metadata = {
  title: "About | Aurent",
  description: "The story of Aurent, a curated luxury watch retailer.",
};

export default function AboutPage() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">Our Story</p>
            <h1 className="mt-4 font-display text-4xl font-light md:text-5xl">About Aurent</h1>
            <p className="mt-6 text-stone">
              Aurent was founded on a simple belief: that a watch should be more than a tool. It is a statement of taste, a record of moments, and a companion for a lifetime. We curate timepieces from independent ateliers and established maisons, each authenticated and inspected before it reaches you.
            </p>
            <p className="mt-4 text-stone">
              Our team includes collectors, watchmakers, and designers who share a single standard — pieces that speak for themselves. We do not chase trends. We select watches that will matter in ten, twenty, and fifty years.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            <Image src="/images/watches/ostron-apx-005.svg" alt="Aurent about" fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
