import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({})

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const { error } = await authClient.changePassword({
    newPassword,
    currentPassword,
    revokeOtherSessions: true,
  })
  return { error }
}

export async function changeEmail(email: string) {
  const { error } = await authClient.changeEmail({
    newEmail: email,
    callbackURL: '/settings/',
  })
  return { error }
}

export async function requestPassWordReset(email: string) {
  await authClient.requestPasswordReset({
    email: email,
    redirectTo: '/sign-in/password/reset/',
  })
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await authClient.signIn.email(
    {
      email,
      password,
      callbackURL: '/settings/',
      rememberMe: false,
    },
    {},
  )
  return { data, error }
}

export async function signInWithGoogle() {
  const { data, error } = await authClient.signIn.social({
    provider: 'google',
    callbackURL: '/settings/',
  })
  return { data, error }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
  image?: string,
) {
  const { data, error } = await authClient.signUp.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
      image, // User image URL (optional)
      callbackURL: '/settings/', // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: () => {
        //show loading
        fetch('/api/emails?email=' + email)
      },
      onSuccess: () => {
        //redirect to the dashboard or sign in page
        window.location.href = '/settings/'
      },
      onError: (ctx) => {
        // error will be handled by the caller
      },
    },
  )
  return { data, error }
}

export async function changeName(name: string) {
  await authClient.updateUser({
    name,
  })
}

export async function deleteUser(password: string) {
  await authClient.deleteUser({
    password,
  })
}
