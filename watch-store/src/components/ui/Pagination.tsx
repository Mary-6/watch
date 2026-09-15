import Link from "next/link";

interface PaginationProps {
  page: number;
  pages: number;
}

export default function Pagination({ page, pages }: PaginationProps) {
  if (pages <= 1) return null;
  const items = [];
  for (let i = 1; i <= pages; i++) {
    items.push(i);
  }
  return (
    <div className="flex items-center justify-center gap-3">
      {items.map((p) => (
        <Link
          key={p}
          href={`/shop?page=${p}`}
          className={`flex h-10 w-10 items-center justify-center border text-sm transition ${
            p === page ? "border-ink bg-ink text-cream" : "border-ink/10 hover:border-brass hover:text-brass"
          }`}
        >
          {p}
        </Link>
      ))}
    </div>
  );
}
