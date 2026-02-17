import { S3Client } from '@aws-sdk/client-s3'
import 'dotenv/config'

export const s3Client = new S3Client({
  endpoint: process.env.AWS_S3_URL!,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID!,
    secretAccessKey: process.env.AWS_ACCESS_SECRET!,
  },
  region: process.env.AWS_S3_REGION!,
})
