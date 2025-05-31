import { db } from "@/db";
import {
  ReviewIndicator,
  reviewIndicatorTable,
  reviewTable,
} from "@/db/schema";
import { getCurrentSession } from "@/lib/session";
import { getUserFromGoogleId } from "@/lib/user";

export async function POST(request: Request) {
  const session = await getCurrentSession();

  const user = await getUserFromGoogleId(session.user?.googleId || "");
  const res = await request.json();
  const indicators: ReviewIndicator[] = res.indicators;
  await db
    .insert(reviewTable)
    .values({
      userId: user?.id || "",
      entityId: res.entity_id,
      id: res.review_id,
      rating: res.rating,
      comment: res.reviewText,
    })
    .then(() => {
      return db.insert(reviewIndicatorTable).values(indicators);
    });
  return Response.json({
    message: "Review submitted successfully",
    data: {
      entity_id: res.entity_id,
      review_id: res.review_id,
      rating: res.rating,
      indicators: res.indicators,
      reviewText: res.reviewText,
    },
  });
}
