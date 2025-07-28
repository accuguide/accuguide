import { db } from '@/lib/db'
import { emailTable } from '@/lib/db/schema'
import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Update the email to mark as unsubscribed
    const unsubscribedEmail = await db
      .update(emailTable)
      .set({ subscribed: false })
      .where(eq(emailTable.email, email))
      .returning({
        email: emailTable.email,
        subscribed: emailTable.subscribed,
      })

    if (unsubscribedEmail.length === 0) {
      console.error('Error unsubscribing email:')
      return NextResponse.json(
        { error: 'An error occurred while unsubscribing' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Email unsubscribed successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error unsubscribing email:', error)
    return NextResponse.json(
      { error: 'An error occurred while unsubscribing' },
      { status: 500 },
    )
  }
}
