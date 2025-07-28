import { auth } from '@/lib/auth'
import { uploadProfilePicture } from '@/lib/s3/functions'

export async function POST(request: Request) {
  const formData = await request.formData()
  const image = formData.get('image') // This is a File or Blob
  if (!(image instanceof File)) {
    return new Response(JSON.stringify({ error: 'No image file provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
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
}
