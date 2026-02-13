import { CreateBucketCommand } from '@aws-sdk/client-s3'
import { s3Client } from '.'

const buckets: string[] = ['profile-images', 'review-images']

const createBucket = async () => {
  try {
    for (const bucket of buckets) {
      const command = new CreateBucketCommand({ Bucket: bucket })
      const data = await s3Client.send(command)
      console.log('Bucket created successfully:', data.Location)
    }
  } catch (err) {
    console.error('Error creating bucket:', err)
  }
}
createBucket()
