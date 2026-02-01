import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email') || ''
  const response = await fetch(
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
        vars: JSON.stringify({ age: 26 }),
      }),
    },
  )

  const data = await response.json()

  return NextResponse.json(
    { message: `${data} Email added successfully` },
    { status: 200 },
  )
}
