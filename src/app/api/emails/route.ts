import { db } from '@/lib/db'
import { emailTable } from '@/lib/db/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email') || ''
  await db.insert(emailTable).values({
    email,
  })
  return NextResponse.json(
    { message: 'Email added successfully' },
    { status: 200 },
  )
}
