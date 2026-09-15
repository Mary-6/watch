"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-80 max-w-full bg-cream p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-6 top-6" aria-label="Close menu">
          <X className="h-6 w-6" />
        </button>
        <nav className="mt-12 flex flex-col gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-display text-2xl font-light transition-colors hover:text-brass"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
