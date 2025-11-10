'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
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
import { signInWithGoogle, signUpWithEmail } from '@/lib/auth-client'
import Loading from '../loading'
import FormContainer from './form-container'
import GoogleSignInButton from './google-signin-button'

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
})

export default function SignupForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const { error } = await signUpWithEmail(
      values.email,
      values.password,
      values.username,
    )

    if (error != null) {
      setLoading(false)
      toast.error('There was an error creating your account', {
        description: `${error.message}`,
      })
    }
  }

  return (
    <FormContainer>
      <div>
        <div className="form-title">
          <h1>Sign Up</h1>
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
                          placeholder="name@example.com"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password123!"
                          required
                          autoComplete="new-password"
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="name-example"
                          required
                          autoComplete="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Sign up
                {loading && <Loading />}
              </Button>

              <GoogleSignInButton onClick={signInWithGoogle} />

              <div className="secondary-text text-center">
                Already have an account? <Link href="/sign-in/">Sign in</Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <LegalAgreement />
    </FormContainer>
  )
}
