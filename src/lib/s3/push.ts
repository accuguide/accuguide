import { CreateBucketCommand } from '@aws-sdk/client-s3'
import { s3Client } from '.'

const buckets = ['profile-images', 'review-images']

const createBucket = async (bucketName: string) => {
  try {
    const command = new CreateBucketCommand({ Bucket: bucketName })
    const data = await s3Client.send(command)
    console.log(`Bucket '${bucketName}' created successfully:`, data.Location)
  } catch (err) {
    console.error(`Error creating bucket '${bucketName}':`, err)
  }
}

const createBuckets = async () => {
  for (const bucket of buckets) {
    await createBucket(bucket)
  }
}

createBuckets()
