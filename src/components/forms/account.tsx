'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { changeEmail, changePassword } from '@/lib/auth-client'
import FormContainer from './form-container'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address').optional(),
  currentPassword: z
    .string()
    .min(6, 'Current password must be at least 6 characters')
    .optional(),
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters')
    .optional(),
})

export default function Account() {
  const [disableSubmit, setDisableSubmit] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      currentPassword: '',
      newPassword: '',
    },
  })

  useEffect(() => {
    fetch('/api/user', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentEmail(data.user?.email ?? '')
        form.reset({
          email: data.user?.email ?? '',
        })
      })
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDisableSubmit(true)
    if (values.email && values.email !== currentEmail) {
      await changeEmail(values.email)
    }
    if (values.currentPassword && values.newPassword) {
      await changePassword(values.currentPassword, values.newPassword)
    }
    window.location.reload()
  }

  return (
    <FormContainer>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Account Settings</CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Change Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Change Password</FormLabel>
                        <FormControl>
                          <Input
                            id="currentPassword"
                            type="password"
                            placeholder="Current Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="New Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={disableSubmit}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </FormContainer>
  )
}
