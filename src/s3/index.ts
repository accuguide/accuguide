import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
import "dotenv/config";

// Configure the AWS SDK to use LocalStack
export const s3Client = new S3Client({
  endpoint: process.env.AWS_S3_URL!, // LocalStack endpoint
  forcePathStyle: true, // Required for LocalStack
  credentials: {
    accessKeyId: "test", // Default LocalStack credentials
    secretAccessKey: "test",
  },
  region: "us-west-1",
});

// Bucket name
const bucketName = "pfps";

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
