'use client'

import clsx from 'clsx'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function FavoriteButton({ id }: { id: string }) {
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    fetch(`/api/profile/favorites?entityId=${id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setFavorited(data.favorited)
      })
      .catch((error) => {
        console.error(`Error fetching favorite status for ${id}:`, error)
      })
  }, [id])

  function favorite() {
    console.log(`/api/profile/favorites?entityId=${id}&favorited=${favorited}`)
    fetch(`/api/profile/favorites?entityId=${id}&favorited=${favorited}`, {
      method: 'POST',
    })
      .then((res) => {
        if (!res.ok)
          if (!res.ok) toast.error('You must be signed in to favorite items')
        return res.json()
      })
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setFavorited(!favorited)
        console.log(`Successfully updated favorite status for ${id}`)
      })
      .catch((error) => {
        console.error(`Error updating favorite status for ${id}:`, error)
      })
  }
  return (
    <div
      role="button"
      onClick={favorite}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          favorite()
        }
      }}
      tabIndex={0}
      className="flex h-8 w-10 items-center justify-center rounded-lg border-2"
    >
      <Heart fill={clsx(favorited ? 'darkred' : '')} size={20} />
    </div>
  )
}
