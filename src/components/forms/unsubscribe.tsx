'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormContainer from './form-container'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

function UnsubscribeFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      form.setValue('email', emailParam)
    }
  }, [searchParams, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/emails/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      })

      if (!response.ok) {
        throw new Error('Failed to unsubscribe - this email is not subscribed')
      }

      setIsSuccess(true)
      toast.success('Successfully unsubscribed from Accuguide emails')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error), {
        description:
          'Please try again or contact support if the problem persists.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <FormContainer>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Successfully Unsubscribed</CardTitle>
            <CardDescription>
              You have been successfully unsubscribed from Accuguide emails.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground text-sm">
              We&apos;re sorry to see you go. If you change your mind, you can
              always sign up again.
            </p>
          </CardContent>
        </Card>
      </FormContainer>
    )
  }

  return (
    <FormContainer>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Unsubscribe from Accuguide</CardTitle>
          <CardDescription>
            Enter your email address to unsubscribe from all Accuguide emails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Unsubscribing...' : 'Unsubscribe'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </FormContainer>
  )
}

export default function UnsubscribeForm() {
  return (
    <Suspense
      fallback={
        <FormContainer>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">
                Unsubscribe from Accuguide
              </CardTitle>
              <CardDescription>
                Enter your email address to unsubscribe from all Accuguide
                emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">Loading...</div>
            </CardContent>
          </Card>
        </FormContainer>
      }
    >
      <UnsubscribeFormContent />
    </Suspense>
  )
}
