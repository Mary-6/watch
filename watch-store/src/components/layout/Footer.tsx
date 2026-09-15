import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

const footerLinks = {
  Shop: [
    { href: "/shop", label: "All Watches" },
    { href: "/shop?newArrival=true", label: "New Arrivals" },
    { href: "/shop?bestSeller=true", label: "Bestsellers" },
    { href: "/shop?featured=true", label: "Featured" },
    { href: "/brands", label: "Brands" },
  ],
  Client: [
    { href: "/account", label: "My Account" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/cart", label: "Cart" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/shipping", label: "Shipping" },
    { href: "/returns", label: "Returns" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-3xl font-semibold tracking-tight">
              AURENT
            </Link>
            <p className="mt-4 max-w-sm text-stone">
              Curated luxury timepieces from independent ateliers and established maisons. Authenticated, inspected, and delivered with care.
            </p>
            <div className="mt-6">
              <NewsletterForm variant="footer" />
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">{title}</h3>
              <ul className="space-y-3 text-sm text-stone">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-brass">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-stone sm:flex-row">
          <p>© {new Date().getFullYear()} Aurent. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brass">Instagram</a>
            <a href="#" className="hover:text-brass">X</a>
            <a href="#" className="hover:text-brass">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
