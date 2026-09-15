export const dynamic = "force-dynamic";

import Hero from "@/components/home/Hero";
import FeaturedWatches from "@/components/home/FeaturedWatches";
import NewArrivals from "@/components/home/NewArrivals";
import Bestsellers from "@/components/home/Bestsellers";
import BrandLogos from "@/components/home/BrandLogos";
import Authenticity from "@/components/home/Authenticity";
import Craftsmanship from "@/components/home/Craftsmanship";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Journal from "@/components/home/Journal";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWatches />
      <NewArrivals />
      <Bestsellers />
      <BrandLogos />
      <Authenticity />
      <Craftsmanship />
      <WhyChooseUs />
      <Testimonials />
      <Journal />
      <section className="bg-ivory py-24 text-center">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <h2 className="font-display text-4xl font-light">Join the Aurent Journal</h2>
          <p className="mt-4 text-stone">Receive curated stories, new arrivals, and collector insights.</p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
