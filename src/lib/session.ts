import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function getServerUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    return session?.user ?? null
  } catch (error) {
    console.error('[getServerUser] Failed to get session', error)
    return null
  }
}

export async function checkAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return session ? session : false
}
