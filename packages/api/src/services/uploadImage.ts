import minioClient from "@/config/minio";
import { NotFoundError, ValidationError } from "@/errors";

type UploadFile = {
  name: string;
  size: number;
};

export async function uploadImage(files: File[]) {
  const bucket = "somboon";

  if (!files || files.length === 0) {
    throw new NotFoundError("No files provided");
  }

  try {
    const exists = await minioClient.bucketExists(bucket);

    if (!exists) {
      await minioClient.makeBucket(bucket, "us-east-1");
    }

    const uploadedFiles: UploadFile[] = [];

    for (const file of files) {
      const objectName = file.name;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await minioClient.putObject(bucket, objectName, buffer, buffer.length, {
        "Content-Type": file.type,
      });
      uploadedFiles.push({ name: objectName, size: file.size });
    }

    return uploadedFiles;
  } catch (error) {
    throw new ValidationError("Image upload failed");
  }
}
