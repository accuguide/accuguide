"use client";

import { StarIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { ReviewIndicator } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Minus } from "lucide-react";
export default function ReviewWrite({
  entity_id,
  entity_type,
}: {
  entity_id: string;
  entity_type: string;
}) {
  const [rating, setRating] = useState(0);
  const review_id = uuidv4();
  const [indicators, setIndicators] = useState<ReviewIndicator[]>([]);

  function handleSubmit() {
    console.log(entity_id);
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
    fetch("/api/indicator?type=" + entity_type)
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
        // Process the indicators data as needed
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <p>Type: {entity_type}</p>
      <h2 className="mb-2">Write a Review</h2>
      <p className="mb-2">Your rating: {rating} stars</p>
      {stars(rating)}
      <div className="text-sm max-w-[50%]">
        <div className="grid grid-cols-3 gap-0 border rounded-lg overflow-hidden mb-2">
          {indicators.map((indicator, index) => (
            <Card
              key={indicator.id}
              className={`
              rounded-none border-0 px-2 py-1.5
              ${index % 3 !== 2 ? "border-r" : ""} 
              ${Math.floor(index / 3) !== Math.floor((indicators.length - 1) / 3) ? "border-b" : ""}
            `}
            >
              <div className="flex items-center justify-between h-full">
                <div className="font-medium text-xs leading-tight flex-1 pr-2">
                  {indicator.indicator}
                </div>

                <div className="flex gap-1">
                  <Button
                    size="sm"
                    title="Yes"
                    className={`h-5 w-5 p-0 ${
                      indicator.exists === true
                        ? "bg-green-800"
                        : "bg-green-100"
                    }`}
                  >
                    <Check className="h-2.5 w-2.5" />
                  </Button>

                  <Button
                    size="sm"
                    className={`h-5 w-5 p-0 ${
                      indicator.exists === false ? "bg-red-800" : "bg-red-100"
                    }`}
                    title="No"
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>

                  <Button
                    size="sm"
                    className={`h-5 w-5 p-0 ${
                      indicator.exists === null ? "bg-neutral-400" : ""
                    }`}
                    title="Clear"
                  >
                    <Minus className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Textarea
        disabled={rating === 0}
        className="md:max-w-[50%] mb-2"
        placeholder="Write your review here..."
      ></Textarea>
      <Button disabled={rating === 0}>Submit</Button>
    </form>
  );
}
