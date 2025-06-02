import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/s3";
import { randomUUID } from "crypto";

const BUCKET = "profile-images";

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
  return key;
}

export async function getSignedUrlForKey(
  key: string,
  expiresInSeconds = 3600,
): Promise<string> {
  const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
  const { GetObjectCommand } = await import("@aws-sdk/client-s3");

  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}
