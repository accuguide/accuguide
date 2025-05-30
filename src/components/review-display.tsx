import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, StarIcon, X } from "lucide-react";
import ReviewWrite from "./review-write";
import { getUsernameFromId } from "@/lib/user";
import { checkAuthDisplay } from "@/lib/auth";

interface Review {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string;
  createdAt: Date | string;
}

interface Indicator {
  id: string;
  reviewId: string;
  indicator: string;
  exists: boolean | null;
}

export default async function ReviewDisplay({
  entity_id,
  entity_type,
  reviews,
  indicators,
}: {
  entity_id: string;
  entity_type: string;
  reviews: Review[];
  indicators: Indicator[];
}) {
  const isAuthenticated = await checkAuthDisplay();

  function stars(rating: number) {
    return (
      <div className="flex mb-2 w-24">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={` w-4 ${star <= rating ? "text-yellow-500" : ""}`}
            fill={star <= rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="md:max-w-[50%]">
      <h2 className="text-xl my-4">Reviews</h2>
      <ReviewWrite
        entity_id={entity_id}
        entity_type={entity_type}
        auth={isAuthenticated}
      />
      <div className="mt-2">
        {reviews.map((review) => (
          <div key={review.id} className="border-b py-2">
            <p className="text-sm font-semibold mb-1">
              {getUsernameFromId(review.userId)}
            </p>
            <div className="text-sm">{stars(review.rating)}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-0 rounded-lg overflow-hidden">
              {indicators
                .filter(
                  (indicator) =>
                    indicator.reviewId === review.id &&
                    indicator.exists !== null,
                )
                .map((indicator) => (
                  <div key={indicator.id}>
                    <Card className="rounded-none border-0 px-2 py-1.5 ">
                      <div className="flex items-center justify-between h-full">
                        <div className="text-xs leading-tight flex-1">
                          {indicator.indicator}{" "}
                        </div>
                        <div className="flex gap-1">
                          {!indicator.exists && (
                            <Button
                              type="button"
                              size="sm"
                              title="No"
                              className="h-5 w-5 p-0 bg-green-500 dark:bg-green-800"
                            >
                              <Check className="h-2.5 w-2.5 text-black" />
                            </Button>
                          )}
                          {indicator.exists && (
                            <Button
                              type="button"
                              size="sm"
                              title="Yes"
                              className="h-5 w-5 p-0 bg-red-500 dark:bg-red-800"
                            >
                              <X className="h-2.5 w-2.5 text-black" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>

            <p className="text-sm my-1">{review.comment}</p>
            <p className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
