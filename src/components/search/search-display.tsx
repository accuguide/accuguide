import { ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { SearchDisplayProps } from '@/lib/types'

export default function SearchDisplay({
  displayType,
  id,
  googleId,
  name,
  address,
  type,
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
    <Link href={href} className="block">
      <div className="group cursor-pointer transition-all duration-200 hover:shadow-md border-0 hover:dark:bg-slate-600 rounded-lg px-2">
        <div className="flex items-start justify-between py-3">
          <div className="flex-1 min-w-0 max-w-xs md:max-w-sm">
            {/* Name and external link indicator */}
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200 truncate">
              {name}
            </h3>

            {/* Type badge */}
            {capitalizedType && (
              <Badge variant="default" className="mb-2 text-xs bg-slate-300">
                {capitalizedType}
              </Badge>
            )}

            {/* Address */}
            {address && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="min-w-0">
                  {firstLine && (
                    <div className="font-medium text-foreground">
                      {firstLine}
                    </div>
                  )}
                  {restLines && (
                    <div className="text-muted-foreground">{restLines}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
