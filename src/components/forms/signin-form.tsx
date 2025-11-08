'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import LegalAgreement from '@/components/forms/legal-agreement'
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
import { signInWithEmail, signInWithGoogle } from '@/lib/auth-client'
import FormContainer from './form-container'
import GoogleSignInButton from './google-signin-button'
import Loading from '../loading'
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string(),
})

export default function SigninForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const { error } = await signInWithEmail(values.email, values.password)

    if (error != null) {
      setLoading(false)
      toast.error('There was an error logging you in', {
        description: `${error.message}`,
      })
    }
  }

  return (
    <FormContainer>
      <div>
        <div className="form-title">
          <h1>Sign In</h1>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="/sign-in/password/forgot"
                          className="form-link"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          required
                          autoComplete="current-password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Sign in
                {loading && <Loading />}
              </Button>

              <GoogleSignInButton onClick={signInWithGoogle} />

              <div className="secondary-text text-center">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up/">Sign up</Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <LegalAgreement />
    </FormContainer>
  )
}
