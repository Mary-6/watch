import Image from "next/image";

export default function Authenticity() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink">
          <Image
            src="/images/watches/aurent-d8-002.svg"
            alt="Watch inspection at Aurent"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">Authentication</p>
          <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">Every Watch, Verified</h2>
          <p className="mt-6 text-stone">
            Every timepiece in our collection passes a multi-point inspection. We verify serial numbers, movement calibers, case finishing, and provenance before it is made available.
          </p>
          <ul className="mt-8 space-y-4 text-sm font-medium">
            <li className="flex items-start gap-3"><span className="h-2 w-2 rounded-full bg-brass" />Serial and reference verification</li>
            <li className="flex items-start gap-3"><span className="h-2 w-2 rounded-full bg-brass" />Movement photography and timing tests</li>
            <li className="flex items-start gap-3"><span className="h-2 w-2 rounded-full bg-brass" />Provenance documentation review</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
