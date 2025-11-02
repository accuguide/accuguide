import { S3Client } from '@aws-sdk/client-s3'
import 'dotenv/config'

// Configure the AWS SDK to use LocalStack
export const s3Client = new S3Client({
  endpoint: process.env.AWS_S3_URL!, // LocalStack endpoint
  forcePathStyle: true, // Required for LocalStack
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID!, // Default LocalStack credentials
    secretAccessKey: process.env.AWS_ACCESS_SECRET!,
  },
  region: process.env.AWS_S3_REGION!,
})
