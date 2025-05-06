import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from ".";

const bucketName = "pfps";

const createBucket = async () => {
  try {
    const command = new CreateBucketCommand({ Bucket: bucketName });
    const data = await s3Client.send(command);
    console.log("Bucket created successfully:", data.Location);
  } catch (err) {
    console.error("Error creating bucket:", err);
  }
};
createBucket();
