import { getSignedUrlForReviewImage } from '@/lib/s3/functions'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (!key) {
    return Response.json({ error: 'Missing key parameter' }, { status: 400 })
  }

  try {
    const url = await getSignedUrlForReviewImage(key)
    return Response.json({ url })
  } catch (error) {
    console.error('Error generating signed URL:', error)
    return Response.json(
      { error: 'Failed to generate signed URL' },
      { status: 500 },
    )
  }
}
