"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Watch, Users, ShoppingBag, Tag, FileText, Star, Settings } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Watch },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 flex-shrink-0 border-r border-ink/10 bg-ivory p-6">
      <Link href="/" className="font-display text-2xl font-semibold">AURENT</Link>
      <p className="mb-8 text-xs uppercase tracking-widest text-stone">Admin</p>
      <nav className="space-y-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition ${
              pathname === l.href || pathname.startsWith(l.href + "/") ? "bg-ink text-cream" : "text-stone hover:bg-ink/5"
            }`}
          >
            <l.icon className="h-4 w-4" />
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
