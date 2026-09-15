import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <Image
          src="/images/watches/aurent-c1-001.svg"
          alt="Aurent luxury timepiece"
          fill
          priority
          className="object-contain object-right opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
          Curated Luxury Timepieces
        </p>
        <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.1] md:text-7xl lg:text-8xl">
          The Art of <span className="font-semibold italic text-brass-light">Time</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg font-light text-cream/80">
          Aurent brings together independent ateliers and distinguished maisons for collectors who value provenance, precision, and design.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-cream bg-cream px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-brass hover:text-cream"
          >
            Shop Collection <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-cream/30 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition hover:border-brass hover:text-brass"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
