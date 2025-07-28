import { SearchDisplayProps } from '@/lib/types'
import Link from 'next/link'

export default function SearchDisplay({
  displayType,
  id,
  googleId,
  name,
  address,
  type,
}: SearchDisplayProps) {
  const [firstLine, ...rest] = address.split(', ')
  const capitalizedType = type
    .split('_') // Split the type by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ') // Join the words with spaces

  const href =
    displayType === 'google' ? `/entity/${googleId}` : `/entity/${id}`

  return (
    <Link
      href={href}
      className="mb-2 cursor-pointer block hover:opacity-80 transition-opacity"
    >
      <h3>{name}</h3>
      <p>{capitalizedType}</p>
      <p>
        {firstLine}
        <br />
        {rest.join(', ')}
      </p>{' '}
    </Link>
  )
}
