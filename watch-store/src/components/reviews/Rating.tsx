import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  count?: number;
}

export default function Rating({ value, count }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= Math.round(value) ? "fill-brass text-brass" : "text-ink/10"}`}
          />
        ))}
      </div>
      {count !== undefined && <span className="ml-2 text-xs text-stone">({count})</span>}
    </div>
  );
}
