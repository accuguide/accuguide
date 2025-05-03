"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function ReviewWrite({ entity_id }: { entity_id: string }) {
  return (
    <form>
      <h2 className="mb-2">Write a Review</h2>
      <p className="mt-2">[indicators placeholder]</p>
      <p className="my-2">[rating placeholder]</p>
      <Textarea
        disabled
        className="md:max-w-[50%] mb-2"
        placeholder="Write your review here..."
      ></Textarea>
      <Button disabled>Submit</Button>
    </form>
  );
}
