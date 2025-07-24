import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Indicator {
  id: string;
  reviewId: string;
  indicator: string;
  exists: boolean | null;
}

interface IndicatorDisplayProps {
  indicators: Indicator[];
  reviewId?: string;
  className?: string;
}

export default function IndicatorDisplay({
  indicators,
  reviewId,
  className,
}: IndicatorDisplayProps) {
  const filteredIndicators = reviewId
    ? indicators.filter(
        (indicator) =>
          indicator.reviewId === reviewId && indicator.exists !== null,
      )
    : indicators.filter((indicator) => indicator.exists !== null);

  if (filteredIndicators.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-1 rounded-lg overflow-hidden mb-2",
        className,
      )}
    >
      {filteredIndicators.map((indicator) => (
        <div key={indicator.id}>
          <Card className="px-2 py-1.5 h-full">
            <div className="flex items-center justify-between h-full">
              <div className="text-xs leading-tight flex-1">
                {indicator.indicator}{" "}
              </div>
              <div className="flex gap-1">
                {indicator.exists && (
                  <Button
                    type="button"
                    size="sm"
                    title="No"
                    className="h-5 w-5 p-0 bg-green-500 dark:bg-green-800"
                  >
                    <Check className="h-2.5 w-2.5 text-black" />
                  </Button>
                )}
                {!indicator.exists && (
                  <Button
                    type="button"
                    size="sm"
                    title="No"
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
  );
}
