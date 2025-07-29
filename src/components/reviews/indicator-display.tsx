import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Indicator {
  id: string
  reviewId: string
  indicator: string
  exists: boolean | null
}

interface IndicatorDisplayProps {
  indicators: Indicator[]
  reviewId?: string
  className?: string
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
    : indicators.filter((indicator) => indicator.exists !== null)

  if (filteredIndicators.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'mb-2 grid grid-cols-2 gap-1 overflow-hidden rounded-lg md:grid-cols-4',
        className,
      )}
    >
      {filteredIndicators.map((indicator) => (
        <div key={indicator.id}>
          <Card className="h-full px-2 py-1.5">
            <div className="flex h-full items-center justify-between">
              <div className="flex-1 text-xs leading-tight">
                {indicator.indicator}{' '}
              </div>
              <div className="flex gap-1">
                {indicator.exists && (
                  <Button
                    type="button"
                    size="sm"
                    title="No"
                    className="h-5 w-5 bg-green-500 p-0 dark:bg-green-800"
                  >
                    <Check className="h-2.5 w-2.5 text-black" />
                  </Button>
                )}
                {!indicator.exists && (
                  <Button
                    type="button"
                    size="sm"
                    title="No"
                    className="h-5 w-5 bg-red-500 p-0 dark:bg-red-800"
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
  )
}
