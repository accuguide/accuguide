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
        <h3 className="font-medium text-foreground text-sm">
          {aiScore != null && aiScore != 0 && (
            <p
              className={cn(
                'mb-2 font-semibold',
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
          <Link href={href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </Link>
        </h3>

        <div className="mt-3 flex flex-col items-center">
          {/* Type badge */}
          {capitalizedType && (
            <Badge variant="default" className="mb-2 text-xs">
              {capitalizedType}
            </Badge>
          )}

          {/* Address */}
          {address && address != '' && (
            <div className="text-muted-foreground text-xs">
              {firstLine && (
                <div className="font-medium text-foreground">{firstLine}</div>
              )}
              {restLines && <div className="mt-1">{restLines}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
