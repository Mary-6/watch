import Image from "next/image";

export default function Craftsmanship() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">Craftsmanship</p>
          <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">Where Art Meets Engineering</h2>
          <p className="mt-6 text-stone">
            A great watch is the meeting of art and engineering. From hand-finished bridges to hand-set dials, the details define the piece. Aurent champions makers who still believe in the human touch.
          </p>
        </div>
        <div className="relative order-1 aspect-[4/5] overflow-hidden bg-ink lg:order-2">
          <Image
            src="/images/watches/zephyr-eto-010.svg"
            alt="Aurent craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
