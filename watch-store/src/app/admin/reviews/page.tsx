export const dynamic = "force-dynamic";

import { getReviews, approveReview, rejectReview } from "@/actions/reviews";
import Rating from "@/components/reviews/Rating";

export default async function AdminReviewsPage() {
  const reviews = await getReviews();

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="border border-ink/10 bg-ivory p-6">
            <div className="flex items-start justify-between">
              <div>
                <Rating value={r.rating} />
                <p className="mt-2 font-display text-lg font-medium">{r.title}</p>
                <p className="text-sm text-stone">{r.product.name} · {r.user?.name}</p>
                <p className="mt-2 text-sm">{r.comment}</p>
                <span className="mt-2 inline-block rounded bg-ink/5 px-2 py-1 text-xs uppercase">{r.status}</span>
              </div>
              <div className="flex gap-2">
                <form action={async () => { "use server"; await approveReview(r.id); }}>
                  <button type="submit" className="rounded border border-ink/10 px-3 py-2 text-xs uppercase hover:border-brass hover:text-brass">Approve</button>
                </form>
                <form action={async () => { "use server"; await rejectReview(r.id); }}>
                  <button type="submit" className="rounded border border-ink/10 px-3 py-2 text-xs uppercase hover:border-red-700 hover:text-red-700">Reject</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
