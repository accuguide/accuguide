'use client'

import { StarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Indicator, Review } from '@/lib/types'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import IndicatorDisplay from './indicator-display'

interface ReviewItemProps {
  review: Review
  indicators: Indicator[]
  userInfo: {
    name?: string
    image?: string | null
  }
  userImageUrl?: string
  isOwner: boolean
  showUserInfo: boolean
}

export default function ReviewItem({
  review,
  indicators,
  userInfo,
  userImageUrl,
  isOwner,
  showUserInfo,
}: ReviewItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(review.comment)
  const [entityName, setEntityName] = useState<string>('')

  useEffect(() => {
    const fetchEntityName = async () => {
      try {
        const response = await fetch(`/api/entity/${review.entityId}`)
        if (response.ok) {
          const result = await response.json()
          setEntityName(result.data?.name || 'Unknown Entity')
        } else {
          setEntityName('Unknown Entity')
        }
      } catch (error) {
        console.error('Error fetching entity:', error)
        setEntityName('Unknown Entity')
      }
    }

    fetchEntityName()
  }, [review.entityId])

  function stars(rating: number) {
    return (
      <div className="my-1 flex w-24">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-4 ${star <= rating ? 'text-yellow-500' : ''}`}
            fill={star <= rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    )
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/review', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId: review.id,
          comment: editedComment,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update review')
      }

      const result = await response.json()
      console.log('Review updated successfully:', result)
      setIsEditing(false)
      window.location.reload() // Reload to reflect changes
    } catch (error) {
      console.error('Error updating review:', error)
      // Optionally, you could show an error message to the user here
    }
  }

  const handleCancel = () => {
    setEditedComment(review.comment)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    // TODO: Implement delete functionality
    // You'll need to create an API route to handle the deletion
    if (confirm('Are you sure you want to delete this review?')) {
      console.log('Delete review:', review.id)
    }
  }

  return (
    <div className="border-b-2 border-slate-600 py-2 dark:border-slate-400">
      {showUserInfo && (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={userImageUrl} alt="user profile image" />
            <AvatarFallback>{userInfo?.name?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">{userInfo?.name || 'Unknown'}</p>
        </div>
      )}
      <div>{entityName}</div>
      <div className="text-sm">{stars(review.rating)}</div>
      <IndicatorDisplay indicators={indicators} reviewId={review.id} />

      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="min-h-[80px]"
            placeholder="Edit your review..."
          />
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm">{review.comment}</p>
          {isOwner && (
            <div className="flex items-center gap-1 mt-1">
              <Button size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </>
      )}

      <p className="mt-2 text-xs">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
