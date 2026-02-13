'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  changeEmail,
  changeName,
  changePassword,
  deleteUser,
} from '@/lib/auth-client'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'

const profileSchema = z.object({
  username: z.string().optional(),
  image: z.any(),
})

const accountSchema = z.object({
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

export default function Settings() {
  const [disableSubmit, setDisableSubmit] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const [_currentImage, setCurrentImage] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const deletePasswordRef = useRef<HTMLInputElement>(null)

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      image: null,
    },
  })

  const accountForm = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
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
        profileForm.reset({
          username: data.user?.name ?? '',
          image: data.user?.image ?? null,
        })
        setCurrentEmail(data.user?.email ?? '')
        setCurrentImage(data.user?.image ?? null)
        accountForm.reset({
          email: data.user?.email ?? '',
        })
      })
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      profileForm.setValue('image', file)
      // Create preview URL for the selected image
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    if (values.username) await changeName(values.username)
    if (values.image) {
      const formData = new FormData()
      formData.append('image', values.image)
      await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      })
    }
    window.location.reload()
  }

  async function onAccountSubmit(values: z.infer<typeof accountSchema>) {
    setDisableSubmit(true)
    if (values.email && values.email !== currentEmail) {
      await changeEmail(values.email)
    }
    if (values.currentPassword && values.newPassword) {
      await changePassword(values.currentPassword, values.newPassword)
    }
    window.location.reload()
  }

  function handleDeleteAccount() {
    const password = deletePasswordRef.current?.value
    if (!password) {
      console.error('[handleDeleteAccount] Password is required')
      return
    }
    deleteUser(password)
      .then(() => {
        window.location.href = '/'
      })
      .catch((error) => {
        console.error(`[handleDeleteAccount] ${error}`)
      })
    // Clear the password from the input after use
    if (deletePasswordRef.current) {
      deletePasswordRef.current.value = ''
    }
  }

  return (
    <div className="space-y-12">
      {/* Profile Section */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-slate-600 border-b-2 pb-8 md:grid-cols-3 dark:border-slate-400">
        <div>
          <h2 className="font-bold text-xl">Profile</h2>
          <p>Update your profile information and customize your account.</p>
        </div>

        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
        >
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block font-medium text-sm leading-6"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                placeholder="Username"
                {...profileForm.register('username')}
                className="block w-full rounded-md border-2 border-slate-600 bg-slate-50 px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-[3px] focus:ring-slate-500/50 dark:border-slate-400 dark:bg-slate-950 dark:focus:border-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
            {profileForm.formState.errors.username && (
              <p className="mt-1 text-red-600 text-sm dark:text-red-400">
                {profileForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block font-medium text-sm leading-6"
            >
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <label
                htmlFor="image"
                className="cursor-pointer rounded-md border-2 border-slate-600 bg-slate-50 px-3 py-2 font-semibold text-sm shadow-sm hover:bg-slate-100 dark:border-slate-400 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                Change
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {imagePreview && (
              <p className="mt-2 text-slate-600 text-sm dark:text-slate-400">
                New photo selected - click "Save Profile" to upload
              </p>
            )}
          </div>

          <div className="col-span-full flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-slate-800 px-3 py-2 font-semibold text-slate-100 text-sm shadow-sm hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-slate-800 focus-visible:outline-offset-2 dark:bg-slate-200 dark:text-slate-900 dark:focus-visible:outline-slate-200 dark:hover:bg-slate-300"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Account Section */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-slate-600 border-b-2 pb-12 md:grid-cols-3 dark:border-slate-400">
        <div>
          <h2 className="font-bold text-xl">Account</h2>
          <p>Update your account credentials and security settings.</p>
        </div>

        <form
          onSubmit={accountForm.handleSubmit(onAccountSubmit)}
          className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
        >
          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block font-medium text-sm leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                {...accountForm.register('email')}
                className="block w-full rounded-md border-2 border-slate-600 bg-slate-50 px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-[3px] focus:ring-slate-500/50 dark:border-slate-400 dark:bg-slate-950 dark:focus:border-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
            {accountForm.formState.errors.email && (
              <p className="mt-1 text-red-600 text-sm dark:text-red-400">
                {accountForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="current-password"
              className="block font-medium text-sm leading-6"
            >
              Current Password
            </label>
            <div className="mt-2">
              <input
                id="current-password"
                type="password"
                placeholder="Current Password"
                autoComplete="current-password"
                {...accountForm.register('currentPassword')}
                className="block w-full rounded-md border-2 border-slate-600 bg-slate-50 px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-[3px] focus:ring-slate-500/50 dark:border-slate-400 dark:bg-slate-950 dark:focus:border-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
            {accountForm.formState.errors.currentPassword && (
              <p className="mt-1 text-red-600 text-sm dark:text-red-400">
                {accountForm.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="new-password"
              className="block font-medium text-sm leading-6"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                id="new-password"
                type="password"
                placeholder="New Password"
                autoComplete="new-password"
                {...accountForm.register('newPassword')}
                className="block w-full rounded-md border-2 border-slate-600 bg-slate-50 px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-[3px] focus:ring-slate-500/50 dark:border-slate-400 dark:bg-slate-950 dark:focus:border-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
            {accountForm.formState.errors.newPassword && (
              <p className="mt-1 text-red-600 text-sm dark:text-red-400">
                {accountForm.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="col-span-full flex items-center justify-end gap-x-6">
            <button
              type="submit"
              disabled={disableSubmit}
              className="rounded-md bg-slate-800 px-3 py-2 font-semibold text-slate-100 text-sm shadow-sm hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-slate-800 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-200 dark:text-slate-900 dark:focus-visible:outline-slate-200 dark:hover:bg-slate-300"
            >
              Save Account
            </button>
          </div>
        </form>

        <div className="md:col-span-2 md:col-start-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you absolutely sure you want to delete your account?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account, profile, reviews and remove your data from our
                  servers. Please enter your password to confirm you would like
                  to proceed.
                </DialogDescription>
                <Input
                  ref={deletePasswordRef}
                  type="password"
                  placeholder="Password"
                />
              </DialogHeader>
              <DialogFooter>
                <Button asChild>
                  <DialogTrigger>Cancel</DialogTrigger>
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  asChild
                >
                  <DialogTrigger>Delete Account</DialogTrigger>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
