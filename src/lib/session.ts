import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function getServerUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session?.user
}

export async function checkAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return session ? session : false
}
