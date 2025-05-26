"use client";

import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";

export default function ReviewWrite({
  entity_id,
  entity_type,
}: {
  entity_id: string;
  entity_type: string;
}) {
  const [rating, setRating] = useState(0);

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
    // to do - fetch possible indicators for entity on current component load
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <p>Type: {entity_type}</p>
      <h2 className="mb-2">Write a Review</h2>
      <p className="mb-2">Your rating: {rating} stars</p>
      {stars(rating)}
      <p className="mb-2">[indicators placeholder]</p>
      <Textarea
        disabled={rating === 0}
        className="md:max-w-[50%] mb-2"
        placeholder="Write your review here..."
      ></Textarea>
      <Button disabled={rating === 0}>Submit</Button>
    </form>
  );
}
