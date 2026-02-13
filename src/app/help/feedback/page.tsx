'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  email: z
    .union([z.string().email('Invalid email address'), z.literal('')])
    .optional(),
  source: z.enum(['social_media', 'google', 'friends', 'colleagues']),
  productQuality: z.enum(['worst', 'bad', 'average', 'good', 'great']),
  productDesign: z.enum(['worst', 'bad', 'average', 'good', 'great']),
  onboarding: z.enum(['worst', 'bad', 'average', 'good', 'great']),
  enjoyMost: z.string().optional(),
  improvements: z.string().optional(),
  additionalComments: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      enjoyMost: '',
      improvements: '',
      additionalComments: '',
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      // Handle form submission here
      toast.success('Feedback submitted', {
        description: 'Thank you for your feedback!',
      })
      form.reset()
    } catch (_error) {
      toast.error('Error', {
        description: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const ratingOptions = [
    { value: 'worst', label: 'Worst' },
    { value: 'bad', label: 'Bad' },
    { value: 'average', label: 'Average' },
    { value: 'good', label: 'Good' },
    { value: 'great', label: 'Great' },
  ]

  return (
    <div className="max-w-2xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          data-netlify="true"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optional)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where did you hear about us? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="mt-2 space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="social_media" id="social_media" />
                      <Label htmlFor="social_media" className="font-normal">
                        Social media
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="google" id="google" />
                      <Label htmlFor="google" className="font-normal">
                        Google
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="friends" id="friends" />
                      <Label htmlFor="friends" className="font-normal">
                        Friends
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="colleagues" id="colleagues" />
                      <Label htmlFor="colleagues" className="font-normal">
                        Colleagues
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productQuality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overall product quality *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="mt-2 flex space-x-4"
                  >
                    {ratingOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex flex-col items-center space-y-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`quality-${option.value}`}
                        />
                        <Label
                          htmlFor={`quality-${option.value}`}
                          className="font-normal text-sm"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productDesign"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Design *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="mt-2 flex space-x-4"
                  >
                    {ratingOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex flex-col items-center space-y-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`design-${option.value}`}
                        />
                        <Label
                          htmlFor={`design-${option.value}`}
                          className="font-normal text-sm"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="onboarding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Onboarding experience *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="mt-2 flex space-x-4"
                  >
                    {ratingOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex flex-col items-center space-y-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`onboarding-${option.value}`}
                        />
                        <Label
                          htmlFor={`onboarding-${option.value}`}
                          className="font-normal text-sm"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enjoyMost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What do you enjoy the most about Accuguide?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your answer..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="improvements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How can we make Accuguide better for you?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your answer..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anything else you'd like to share...</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your answer..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
