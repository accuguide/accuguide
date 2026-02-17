import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
import { s3Client } from '@/lib/s3'

function generateKey(name: string): string {
  return `${randomUUID()}-${name}`
}

export async function uploadProfilePicture(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const key = generateKey(file.name)

    await s3Client.send(
      new PutObjectCommand({
        Bucket: 'profile-images',
        Key: generateKey(file.name),
        Body: buffer,
        ContentType: file.type,
      }),
    )
    return key
  } catch (error) {
    throw new Error(`[uploadProfilePicture] error: ${error}`)
  }
}

export async function uploadReviewImages(files: File[]): Promise<string[]> {
  try {
    const keys: string[] = []
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const key = generateKey(file.name)

      await s3Client.send(
        new PutObjectCommand({
          Bucket: 'review-images',
          Key: key,
          Body: buffer,
          ContentType: file.type,
        }),
      )
      keys.push(key)
    }
    return keys
  } catch (error) {
    throw new Error(`[uploadReviewImages] error: ${error}`)
  }
}

export async function getProfileImage(key: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: 'profile-images',
      Key: key,
    })

    const url = await getSignedUrl(s3Client, command)

    return url
  } catch (error) {
    throw new Error(`[getProfileImage] error: ${error}`)
  }
}

export async function getReviewImages(keys: string[]): Promise<string[]> {
  try {
    const urls: string[] = []
    for (const key of keys) {
      const command = new GetObjectCommand({
        Bucket: 'review-images',
        Key: key,
      })
      const url = await getSignedUrl(s3Client, command)
      urls.push(url)
    }
    return urls
  } catch (error) {
    throw new Error(`[getReviewImages] error: ${error}`)
  }
}
