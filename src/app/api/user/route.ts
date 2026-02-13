import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/session'

export async function GET() {
  try {
    const user = await getServerUser()
    return new NextResponse(JSON.stringify({ user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: `[api/user GET] error: ${error}` })
  }
}
