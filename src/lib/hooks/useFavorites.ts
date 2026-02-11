import { useEffect, useState } from 'react'

interface Favorite {
  entityId: string
}

export function useFavorites(entityId?: string) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!entityId) return
    
    // Check if entity is favorited
    // Note: This fetches all favorites to check one entity. For users with many favorites,
    // consider adding a dedicated /api/favorites/check?entityId=${entityId} endpoint
    fetch('/api/favorites')
      .then((res) => res.json())
      .then((data) => {
        const favorites: Favorite[] = data.favorites || []
        setIsFavorite(favorites.some((f) => f.entityId === entityId))
      })
      .catch(() => {
        // User not logged in or error - not favorited
        setIsFavorite(false)
      })
  }, [entityId])

  const toggleFavorite = async () => {
    if (!entityId) return

    setLoading(true)
    try {
      if (isFavorite) {
        // Remove favorite
        const response = await fetch(`/api/favorites?entityId=${entityId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setIsFavorite(false)
        }
      } else {
        // Add favorite
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ entityId }),
        })
        if (response.ok) {
          setIsFavorite(true)
        }
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  return { isFavorite, toggleFavorite, loading }
}
