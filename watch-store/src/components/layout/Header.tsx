"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/brands", label: "Brands" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="p-2 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
              AURENT
            </Link>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-ink/80 transition-colors hover:text-brass"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="p-2 transition-colors hover:text-brass"
            >
              <Search className="h-5 w-5" />
            </button>
            {session?.user ? (
              <Link href="/account" className="p-2 transition-colors hover:text-brass">
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link href="/login" className="p-2 transition-colors hover:text-brass">
                <User className="h-5 w-5" />
              </Link>
            )}
            <Link href="/wishlist" className="p-2 transition-colors hover:text-brass">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative p-2 transition-colors hover:text-brass">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            {session?.user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="hidden rounded border border-ink/10 px-3 py-1 text-xs font-medium uppercase tracking-wider hover:border-brass hover:text-brass lg:inline-block"
              >
                Admin
              </Link>
            )}
            {session && (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden text-xs uppercase tracking-wider hover:text-brass lg:inline"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}
