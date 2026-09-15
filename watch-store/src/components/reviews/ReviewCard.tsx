import Rating from "./Rating";

interface ReviewCardProps {
  review: {
    rating: number;
    title?: string | null;
    comment?: string | null;
    user?: { name: string | null } | null;
    createdAt?: Date;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border-b border-ink/10 py-6">
      <Rating value={review.rating} />
      <h3 className="mt-2 font-display text-lg font-medium">{review.title}</h3>
      <p className="mt-2 text-sm text-stone">{review.comment}</p>
      <p className="mt-3 text-xs text-stone">
        {review.user?.name ?? "Verified Collector"}
        {review.createdAt ? ` — ${new Date(review.createdAt).toLocaleDateString()}` : ""}
      </p>
    </div>
  );
}
