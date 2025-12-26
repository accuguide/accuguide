import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs', // Required for auth.api calls
  matcher: ['/admin', '/settings', '/sign-out'], // Specify the routes the middleware applies to
}
