"use client";

import { useEffect } from "react";
import ErrorCard from "@/components/card/ErrorCard";
import Title from "@/components/layout/title";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mt-8 max-w-xl">
      <Title>An error occurred</Title>
      <ErrorCard
        title="Something went wrong"
        description="Please try again, and contact us if this issue persists."
        link={{ href: "/contact", label: "Contact Support" }}
      />
    </div>
  );
}
