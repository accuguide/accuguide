import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/s3";
import { randomUUID } from "crypto";

const BUCKET = "pfps";

export async function uploadProfilePicture(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const key = `${randomUUID()}-${file.name}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read", // Make public, or use signed URLs
    }),
  );

  // Construct the public URL (adjust if using a different endpoint)
  const url = `${process.env.AWS_S3_URL}/${BUCKET}/${key}`;
  return url;
}
