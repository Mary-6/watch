"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-cream/98 backdrop-blur-md">
      <div className="mx-auto max-w-3xl px-6 pt-24">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-light">What are you looking for?</h2>
          <button onClick={onClose} aria-label="Close search">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 border-b-2 border-ink/10 pb-2">
          <div className="flex items-center gap-4">
            <Search className="h-6 w-6 text-stone" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watches, brands, collections..."
              className="w-full bg-transparent font-display text-3xl font-light outline-none placeholder:text-stone"
            />
          </div>
        </form>
        <div className="mt-8 flex flex-wrap gap-3">
          {["Diver", "Dress", "Chronograph", "Pilot"].map((term) => (
            <Link
              key={term}
              href={`/shop?category=${term.toLowerCase()}`}
              onClick={onClose}
              className="rounded-full border border-ink/10 px-4 py-2 text-sm hover:border-brass hover:text-brass"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
