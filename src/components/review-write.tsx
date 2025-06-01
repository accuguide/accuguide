"use client";

import { StarIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { FormEvent, useEffect, useState, useRef } from "react";
import { ReviewIndicator } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils"; // Adjust the path if needed
import Link from "next/link";

export default function ReviewWrite({
  entity_id,
  entity_type,
  auth,
}: {
  entity_id: string;
  entity_type: string;
  auth: boolean;
}) {
  const [rating, setRating] = useState(0);
  const review_id = useRef(uuidv4()).current;
  const [indicators, setIndicators] = useState<ReviewIndicator[]>([]);
  const [reviewText, setReviewText] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("/api/review/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entity_id,
        review_id,
        rating,
        indicators,
        reviewText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  }

  function handleIndicatorChange(ind: ReviewIndicator, newVal: boolean | null) {
    setIndicators((prev) =>
      prev.map((indicator) =>
        indicator.id === ind.id ? { ...indicator, exists: newVal } : indicator,
      ),
    );
  }

  function stars(rating: number) {
    return (
      <div className="flex mb-2 w-24">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`cursor-pointer ${star <= rating ? "text-yellow-500" : ""}`}
            fill={star <= rating ? "currentColor" : "none"} // Add fill color
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    );
  }

  useEffect(() => {
    fetch("/api/indicator/?type=" + entity_type)
      .then((response) => response.json())
      .then((data) => {
        for (const indicator of data) {
          setIndicators((prev) => [
            ...prev,
            {
              id: uuidv4(),
              reviewId: review_id,
              indicator: indicator.indicator,
              exists: null,
            },
          ]);
        }
        console.log(data);
      });
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2 className="mb-2">Write a Review</h2>
      {!auth && (
        <p>
          Please{" "}
          <Link className="underline" href="/login/google/">
            sign in
          </Link>{" "}
          to add a review
        </p>
      )}
      {auth && (
        <>
          <p className="mb-2">
            Your rating: {rating !== 0 ? rating : "-"} stars
          </p>
          {stars(rating)}
          <div className="text-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 border-0 rounded-lg overflow-hidden mb-2">
              {indicators.map((indicator) => (
                <Card
                  key={indicator.id}
                  className="rounded-lg border-1 px-2 py-1.5 h-full border-neutral-300 dark:border-neutral-500"
                >
                  <div className="flex items-center justify-between h-full">
                    <div className="text-xs leading-tight flex-1">
                      {indicator.indicator}
                    </div>

                    <div className="flex gap-1">
                      <Button
                        disabled={rating === 0}
                        type="button"
                        size="sm"
                        title="Yes"
                        onClick={() => handleIndicatorChange(indicator, true)}
                        className={cn(
                          "h-5 w-5 p-0",
                          indicator.exists === true
                            ? "bg-green-500 dark:bg-green-800"
                            : "bg-green-100",
                        )}
                      >
                        <Check className="h-2.5 w-2.5 text-black" />
                      </Button>

                      <Button
                        disabled={rating === 0}
                        type="button"
                        size="sm"
                        className={cn(
                          "h-5 w-5 p-0",
                          indicator.exists === false
                            ? "bg-red-500 dark:bg-red-800"
                            : "bg-red-100",
                        )}
                        title="No"
                        onClick={() => handleIndicatorChange(indicator, false)}
                      >
                        <X className="h-2.5 w-2.5 text-black" />
                      </Button>

                      <Button
                        disabled={rating === 0}
                        type="button"
                        size="sm"
                        className={`h-5 w-5 p-0 ${
                          indicator.exists === null
                            ? "bg-neutral-400"
                            : "bg-neutral-100"
                        }`}
                        title="Clear"
                        onClick={() => handleIndicatorChange(indicator, null)}
                      >
                        <Minus className="h-2.5 w-2.5 text-black" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={rating === 0}
            className="mb-2 border-neutral-300 dark:border-neutral-500"
            placeholder="Write your review here..."
          ></Textarea>
          <Button disabled={rating === 0}>Submit</Button>
        </>
      )}
    </form>
  );
}
