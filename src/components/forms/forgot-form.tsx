'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormContainer from '@/components/forms/form-container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { requestPassWordReset } from '@/lib/auth-client'

const formSchema = z.object({
  email: z.string().email(),
})

export default function ForgotForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)
    try {
      await requestPassWordReset(values.email)
      setSubmitted(true)
    } catch (e: unknown) {
      let message = 'Something went wrong. Please try again.'
      if (
        typeof e === 'object' &&
        e &&
        'message' in e &&
        typeof (e as { message?: unknown }).message === 'string'
      ) {
        message = (e as { message: string }).message
      }
      setError(message)
    }
  }

  return (
    <FormContainer>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center text-green-600 dark:text-green-400">
              If an account with that email exists, a password reset link has
              been sent.
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {error && (
                  <div className="text-center text-red-600 text-sm dark:text-red-400">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
              </form>
            </Form>
          )}
          <div className="mt-4 text-center text-neutral-600 text-sm dark:text-neutral-400">
            <Link href="/sign-in/" className="underline">
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </FormContainer>
  )
}
