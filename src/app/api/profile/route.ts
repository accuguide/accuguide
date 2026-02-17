import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadProfilePicture } from '@/lib/s3/functions'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image')
    if (!(image instanceof File)) {
      return NextResponse.json({
        error: `[api/profile POST] error: no image file provided`,
      })
    }
    const key = await uploadProfilePicture(image)
    await auth.api.updateUser({
      headers: request.headers,
      body: {
        image: key,
      },
    })

    return new Response(JSON.stringify({ image: key }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: `[api/profile POST] error: ${error}` })
  }
}
