import { headers } from 'next/headers'
import { auth } from './auth'

export async function signOutServer() {
  await auth.api.signOut({
    headers: await headers(),
  })
}
