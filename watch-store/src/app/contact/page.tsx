export const metadata = {
  title: "Contact | Aurent",
  description: "Get in touch with Aurent for support, curation, or press inquiries.",
};

export default function ContactPage() {
  return (
    <section className="py-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-light md:text-5xl">Get in Touch</h1>
          <p className="mt-6 text-stone">
            Whether you are searching for a specific reference, need authentication advice, or have a question about an order, our team is here to help.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <p><span className="font-semibold">Email</span><br />concierge@aurent.com</p>
            <p><span className="font-semibold">Phone</span><br />+1 (800) AURENT-01</p>
            <p><span className="font-semibold">Hours</span><br />Monday — Friday, 9am — 6pm EST</p>
          </div>
        </div>
        <form className="space-y-6">
          <input type="text" placeholder="Name" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
          <input type="email" placeholder="Email" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
          <textarea rows={5} placeholder="Message" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none focus:border-brass" />
          <button type="submit" className="bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream hover:bg-brass">Send Message</button>
        </form>
      </div>
    </section>
  );
}
