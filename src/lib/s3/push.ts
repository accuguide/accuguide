import { CreateBucketCommand } from '@aws-sdk/client-s3'
import { s3Client } from '.'

const buckets: string[] = ['profile-images', 'review-images']

const createBucket = async () => {
  try {
    for (const bucket of buckets) {
      const command = new CreateBucketCommand({ Bucket: bucket })
      const data = await s3Client.send(command)
      console.info(`[createBucket] ${bucket} created at ${data.Location}`)
    }
  } catch (err) {
    throw new Error(`[createBucket] ${err}`)
  }
}
createBucket()
