import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email') || ''
  try {
    await fetch(
      'https://api.mailgun.net/v3/lists/news@mailgun.accuguide.org/members',
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa(`api:${process.env.EMAIL_API_KEY}`),
        },
        body: new URLSearchParams({
          subscribed: 'True',
          address: email,
          name: 'Accuguide User',
          description: 'Accuguide User',
        }),
      },
    )

    return NextResponse.json(
      { message: `[api/emails GET] ${email} subscribed` },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: `[api/emails GET] error: ${error}` })
  }
}
