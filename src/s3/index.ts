import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
import "dotenv/config";

// Configure the AWS SDK to use LocalStack
export const s3Client = new S3Client({
  endpoint: process.env.AWS_S3_URL!, // LocalStack endpoint
  forcePathStyle: true, // Required for LocalStack
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID!, // Default LocalStack credentials
    secretAccessKey: process.env.AWS_ACCESS_SECRET!,
  },
  region: process.env.AWS_S3_REGION!,
});

// Bucket name
const bucketName = "profile-images";

// Create the bucket
export const createBucket = async () => {
  try {
    const command = new CreateBucketCommand({ Bucket: bucketName });
    const data = await s3Client.send(command);
    console.log("Bucket created successfully:", data.Location);
  } catch (err) {
    console.error("Error creating bucket:", err);
  }
};
