"use client";

import Title from "@/components/layout/title";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Title>An error occurred</Title>
      <p>Please try again, and contact us if this issue persists</p>
    </div>
  );
}
