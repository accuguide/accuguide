'use client'

import { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
export default function Page() {
  //better auth client sign out
  useEffect(() => {
    authClient
      .signOut()
      .then(() => {
        // Redirect to home page after sign out
        window.location.href = '/'
      })
      .catch((error) => {
        console.error('Sign out failed:', error)
      })
  }, [])

  return <p>Signing Out</p>
}
