import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { s3Client } from '@/lib/s3'

const PROFILE_BUCKET = 'profile-images'
const REVIEW_BUCKET = 'review-images'

export async function uploadProfilePicture(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const key = `${randomUUID()}-${file.name}`

    await s3Client.send(
      new PutObjectCommand({
        Bucket: PROFILE_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    )
    return key
  } catch (error) {
    throw error
  }
}

export async function uploadReviewImage(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const key = `${randomUUID()}-${file.name}`

    await s3Client.send(
      new PutObjectCommand({
        Bucket: REVIEW_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    )
    return key
  } catch (error) {
    throw error
  }
}

export async function getSignedUrlForKey(
  key: string,
  expiresInSeconds = 3600,
): Promise<string> {
  try {
    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner')
    const { GetObjectCommand } = await import('@aws-sdk/client-s3')

    const command = new GetObjectCommand({
      Bucket: PROFILE_BUCKET,
      Key: key,
    })

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    })
    return url
  } catch (error) {
    console.error('[getSignedUrlForKey] Error generating signed URL:', error)
    throw error
  }
}

export async function getSignedUrlForReviewImage(
  key: string,
  expiresInSeconds = 3600,
): Promise<string> {
  try {
    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner')
    const { GetObjectCommand } = await import('@aws-sdk/client-s3')

    const command = new GetObjectCommand({
      Bucket: REVIEW_BUCKET,
      Key: key,
    })

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    })
    return url
  } catch (error) {
    console.error(
      '[getSignedUrlForReviewImage] Error generating signed URL:',
      error,
    )
    throw error
  }
}
