import { ShieldCheck, Truck, Gem, Headphones } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Authenticity Guaranteed", text: "Multi-point verification for every watch in our collection." },
  { icon: Truck, title: "Secure Delivery", text: "Insured shipping with signature confirmation worldwide." },
  { icon: Gem, title: "Expert Curation", text: "Independent makers and established maisons hand-picked by specialists." },
  { icon: Headphones, title: "Customer Support", text: "Personal assistance throughout your collecting journey." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-light md:text-5xl">Why Collectors Choose Aurent</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="border border-ink/10 bg-ivory p-8 text-center transition hover:border-brass/40">
              <r.icon className="mx-auto h-8 w-8 text-brass" />
              <h3 className="mt-4 font-display text-xl font-medium">{r.title}</h3>
              <p className="mt-2 text-sm text-stone">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
