export const metadata = { title: "Shipping | Aurent", description: "Shipping and delivery information for Aurent orders." };

export default function ShippingPage() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="mb-6 font-display text-4xl font-light">Shipping</h1>
        <p className="text-stone">All orders are shipped fully insured and require an adult signature. Complimentary express shipping is available for orders over $5,000. Orders over $1,500 qualify for $25 flat-rate express shipping. Otherwise, standard shipping is $45.</p>
      </div>
    </section>
  );
}
