import { db } from "@/db";
import { reviewTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import ReviewWrite from "./review-write";

export default async function ReviewDisplay({
  entity_id,
}: {
  entity_id: string;
}) {
  const reviews = await db
    .select()
    .from(reviewTable)
    .where(eq(reviewTable.entityId, entity_id));
  return (
    <div>
      <h2 className="text-xl mb-2">Reviews</h2>
      <ReviewWrite entity_id={entity_id} />
      <div>
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 py-2">
            <p className="text-sm font-semibold">{review.userId}</p>
            <p className="text-sm">{review.rating}</p>
            <p className="text-sm">{review.comment}</p>
            <p className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
