import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { SearchDisplayProps } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function SearchDisplay({
  displayType,
  id,
  googleId,
  name,
  address,
  type,
  aiScore,
}: SearchDisplayProps) {
  // Handle address formatting more robustly
  const formatAddress = (address: string) => {
    if (!address) return { firstLine: '', restLines: '' }

    const parts = address.split(', ')
    const firstLine = parts[0] || ''
    const restLines = parts.slice(1).join(', ')

    return { firstLine, restLines }
  }

  const { firstLine, restLines } = formatAddress(address)

  // Format type with better handling
  const formatType = (type: string) => {
    if (!type) return ''

    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const capitalizedType = formatType(type)
  const href =
    displayType === 'google' ? `/entity/${googleId}` : `/entity/${id}`

  return (
    <div className="group relative m-2 rounded-lg border-2 border-t border-r border-b border-l p-4 transition-opacity hover:opacity-75 sm:p-6">
      <div className="pt-6 pb-4 text-center">
        {/* Accessibility score label.
          FIX: wrapped in a div with a fixed height (h-5), which always exists —
          whether or not aiScore is set. Before, this whole line only appeared
          when a score existed, making "with score" cards taller than "without". */}
        {/* Keep a fixed one-line slot so cards stay the same height. */}
        <div className="mb-2 flex h-5 w-full items-center justify-center">
          {aiScore != null && aiScore != 0 && (
            <p
              className={cn(
                // Never wrap into the name area; truncate if ever needed.
                'max-w-full truncate text-center font-semibold text-sm',
                aiScore <= 45 && 'text-red-600 dark:text-red-500',
                aiScore > 45 &&
                  aiScore <= 80 &&
                  'text-yellow-700 dark:text-yellow-600',
                aiScore > 80 && 'text-green-700 dark:text-green-600',
              )}
            >
              {aiScore <= 45
                ? 'Low Accessibility'
                : aiScore <= 80
                  ? 'Medium Accessibility'
                  : 'High Accessibility'}
            </p>
          )}
        </div>

        {/* Name.
          FIX: line-clamp-2 caps it at 2 lines max (cuts off with "..." if longer).
          min-h-[2.5rem] reserves space for 2 lines even when the name is short
          and only needs 1 — so short names and long names take the same height. */}
        <h3 className="line-clamp-2 min-h-10 font-medium text-foreground text-sm">
          <Link href={href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </Link>
        </h3>

        <div className="mt-3 flex flex-col items-center">
          {/* Type badge.
            FIX: same trick as the score label — a fixed-height slot (h-6) that
            always exists, badge or not, instead of the row disappearing entirely. */}
          {/* Keep the badge compact; very long types are truncated instead of overflowing. */}
          <div className="mb-2 flex h-6 w-full items-center justify-center px-1">
            {capitalizedType && (
              <Badge
                variant="default"
                title={capitalizedType}
                className="max-w-full shrink rounded-md text-xs"
              >
                <span className="block min-w-0 max-w-full truncate">
                  {capitalizedType}
                </span>
              </Badge>
            )}
          </div>

          {/* Address.
            FIX: min-h-[2rem] always reserves 2 lines of height, and each line
            uses line-clamp-1 so a long firstLine/restLines can't grow past 1 line.
            Before: addresses with no second part (no restLines) made the card
            shorter than addresses with two parts. */}
          <div className="min-h-8 text-muted-foreground text-xs">
            <div className="line-clamp-1 font-medium text-foreground">
              {firstLine}
            </div>
            <div className="mt-1 line-clamp-1">{restLines}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
