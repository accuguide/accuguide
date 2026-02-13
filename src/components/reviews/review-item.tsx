'use client'

import { StarIcon } from 'lucide-react'
import Link from 'next/link'
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
    id: string
  }
  userImageUrl?: string
  reviewImageUrls: string[]
  isOwner: boolean
  showUserInfo: boolean
  profile: boolean
}

export default function ReviewItem({
  review,
  indicators,
  userInfo,
  userImageUrl,
  reviewImageUrls,
  isOwner,
  showUserInfo,
  profile,
}: ReviewItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(review.comment)
  const [entityName, setEntityName] = useState<string>('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
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

      const _result = await response.json()
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
    }
  }

  return (
    <div className="flex space-x-4 text-sm">
      {showUserInfo && (
        <div className="flex-none py-6">
          <Link href={`/profile/${userInfo.id}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={userImageUrl} alt="user profile image" />
              <AvatarFallback>
                {userInfo?.name?.charAt(0) || '?'}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      )}
      <div className="flex-1 border-border py-6">
        {showUserInfo && (
          <h3 className="font-medium text-base text-foreground">
            {userInfo?.name || 'Unknown'}
          </h3>
        )}
        {profile && <div className="font-bold text-sm">{entityName}</div>}
        <p className="secondary-text mt-0 text-xs">
          <time dateTime={new Date(review.createdAt).toISOString()}>
            {isClient ? new Date(review.createdAt).toLocaleDateString() : ''}
          </time>
        </p>

        <div className="my-4">{stars(review.rating)}</div>

        <IndicatorDisplay indicators={indicators} reviewId={review.id} />

        {reviewImageUrls.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {reviewImageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Review ${url} ${index + 1}`}
                className="h-32 w-32 rounded-md object-cover"
              />
            ))}
          </div>
        )}

        {isEditing ? (
          <div className="mt-4 space-y-4">
            <Textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="min-h-20"
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
            <p className="secondary-text mt-4 font-semibold text-sm leading-6">
              {review.comment}
            </p>
            {isOwner && (
              <div className="mt-4 flex items-center gap-1">
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
      </div>
    </div>
  )
}
