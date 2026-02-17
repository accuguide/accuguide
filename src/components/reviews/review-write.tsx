'use client'

import { Check, Minus, StarIcon, X } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ReviewIndicator as DBReviewIndicator } from '@/lib/db/schema'
import { cn } from '@/lib/utils' // Adjust the path if needed

// Extend ReviewIndicator to include 'category'
type ReviewIndicator = DBReviewIndicator & {
  category: string
}

export default function ReviewWrite({
  entity_id,
  entity_type,
  auth,
}: {
  entity_id: string
  entity_type: string
  auth: boolean
}) {
  const [rating, setRating] = useState(0)
  const review_id = useRef(uuidv4()).current
  const [indicators, setIndicators] = useState<ReviewIndicator[]>([])
  const [reviewText, setReviewText] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [images])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('entity_id', entity_id)
    fd.append('review_id', review_id)
    fd.append('rating', String(rating))
    fd.append('reviewText', reviewText)
    fd.append('indicators', JSON.stringify(indicators))
    images.forEach((img) => fd.append('images', img))

    fetch('/api/review', {
      method: 'POST',
      body: fd,
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        console.error(`[review-write handleSubmit] ${error}`)
      })
  }

  function handleIndicatorChange(ind: ReviewIndicator, newVal: boolean | null) {
    setIndicators((prev) =>
      prev.map((indicator) =>
        indicator.id === ind.id ? { ...indicator, exists: newVal } : indicator,
      ),
    )
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  function stars(rating: number) {
    return (
      <div className="mt-4 mb-2 flex w-24">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : ''}`}
            fill={star <= rating ? 'currentColor' : 'none'} // Add fill color
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    )
  }

  useEffect(() => {
    fetch('/api/indicator/?type=' + entity_type)
      .then((response) => response.json())
      .then((data) => {
        const newIndicators = data.map(
          (indicator: { indicator: string; category: string }) => ({
            id: uuidv4(),
            reviewId: review_id,
            indicator: indicator.indicator,
            category: indicator.category,
            exists: null,
          }),
        )
        setIndicators(newIndicators)
      })
  }, [])

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {!auth && (
        <p className="text-sm">
          Please{' '}
          <Link className="underline" href="/sign-in/">
            sign in
          </Link>{' '}
          to add a review
        </p>
      )}
      {auth && (
        <>
          <p className="mt-4">
            Your rating: {rating !== 0 ? rating : '-'} stars
          </p>
          {stars(rating)}
          <Accordion
            type="multiple"
            className="w-full text-sm"
            defaultValue={['General', 'Bathroom']}
          >
            {Object.entries(
              indicators.reduce(
                (acc, indicator) => {
                  if (!acc[indicator.category]) {
                    acc[indicator.category] = []
                  }
                  acc[indicator.category].push(indicator)
                  return acc
                },
                {} as Record<string, typeof indicators>,
              ),
            ).map(([category, categoryIndicators]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="my-2 px-1 py-2 font-semibold text-gray-700 text-sm hover:bg-slate-400 focus:ring-0 dark:text-gray-300 dark:hover:bg-slate-500">
                  {category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-1 mb-2 grid grid-cols-2 gap-1 overflow-hidden rounded-lg border-0 md:grid-cols-3">
                    {categoryIndicators.map((indicator) => (
                      <Card
                        key={indicator.id}
                        className={cn(
                          'h-full px-2 py-1.5',
                          rating === 0
                            ? 'border-slate-400 dark:border-slate-600'
                            : '',
                        )}
                      >
                        <div className="flex h-full items-center justify-between">
                          <div className="flex-1 text-xs leading-tight">
                            {indicator.indicator}
                          </div>

                          <div className="flex gap-1">
                            <Button
                              disabled={rating === 0}
                              type="button"
                              size="sm"
                              title="Yes"
                              onClick={() =>
                                handleIndicatorChange(indicator, true)
                              }
                              className={cn(
                                'h-5 w-5 p-0',
                                indicator.exists === true
                                  ? 'bg-green-500 dark:bg-green-800'
                                  : 'bg-green-200 dark:bg-green-200',
                              )}
                            >
                              <Check className="h-2.5 w-2.5 text-black" />
                            </Button>

                            <Button
                              disabled={rating === 0}
                              type="button"
                              size="sm"
                              className={cn(
                                'h-5 w-5 p-0',
                                indicator.exists === false
                                  ? 'bg-red-500 dark:bg-red-800'
                                  : 'bg-red-200 dark:bg-red-200',
                              )}
                              title="No"
                              onClick={() =>
                                handleIndicatorChange(indicator, false)
                              }
                            >
                              <X className="h-2.5 w-2.5 text-black" />
                            </Button>

                            <Button
                              disabled={rating === 0}
                              type="button"
                              size="sm"
                              className={`h-5 w-5 p-0 ${
                                indicator.exists === null
                                  ? 'bg-neutral-900 dark:bg-neutral-400'
                                  : 'bg-neutral-500 dark:bg-neutral-100'
                              }`}
                              title="Clear"
                              onClick={() =>
                                handleIndicatorChange(indicator, null)
                              }
                            >
                              <Minus className="h-2.5 w-2.5 text-white dark:text-black" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={rating === 0}
            className="mt-1 mb-4 border-slate-800 dark:border-slate-200"
            placeholder="Write your review here..."
          ></Textarea>
          <input
            type="file"
            multiple
            accept="image/*"
            disabled={rating === 0}
            className="mb-2"
            onChange={(e) => {
              const files = Array.from(e.target.files || [])
              if (files.length) {
                setImages((prev) => [...prev, ...files])
              }
              e.currentTarget.value = ''
            }}
          />
          {previews.length > 0 && (
            <div className="mb-3 flex max-w-sm gap-2">
              {previews.map((src, idx) => (
                <div
                  key={idx}
                  className="relative h-16 w-16 overflow-hidden rounded border"
                >
                  <img
                    src={encodeURI(src)}
                    alt={`preview-${idx}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 rounded-full bg-black/70 p-0.5 text-white hover:bg-black"
                    aria-label="Remove image"
                    title="Remove image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <Button disabled={rating === 0}>Submit</Button>
        </>
      )}
    </form>
  )
}
