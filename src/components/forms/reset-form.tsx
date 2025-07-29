'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
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
import { authClient } from '@/lib/auth-client'

const formSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

function ResetFormContent() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '' },
  })
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)
    try {
      await authClient.resetPassword({
        newPassword: values.password,
        token,
      })
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
          <CardTitle className="text-xl">Reset your password</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center text-green-600 dark:text-green-400">
              Your password has been reset. You can now{' '}
              <Link href="/sign-in/" className="underline">
                sign in
              </Link>{' '}
              with your new password.
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter new password"
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
                  <div className="text-center text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full">
                  Reset password
                </Button>
              </form>
            </Form>
          )}
          <div className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/sign-in/" className="underline">
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </FormContainer>
  )
}

export default function ResetForm() {
  return (
    <Suspense
      fallback={
        <FormContainer>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Reset your password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">Loading...</div>
            </CardContent>
          </Card>
        </FormContainer>
      }
    >
      <ResetFormContent />
    </Suspense>
  )
}
