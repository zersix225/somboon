import minioClient from "@/config/minio";
import type { UploadImageService } from "@/types/services/uploadImage";
import { NotFoundError, ValidationError } from "@/errors";

export function create(): UploadImageService["create"] {
  return async (files) => {
    const bucket = "somboon";

    if (!files || files.length === 0) {
      throw new NotFoundError("No files provided");
    }

    try {
      const exists = await minioClient.bucketExists(bucket);

      if (!exists) {
        await minioClient.makeBucket(bucket, "us-east-1");
      }

      const uploadedFiles: {
        name: string;
        size: number;
        _tag: "UploadImage";
      }[] = [];

      for (const file of files) {
        const objectName = file.name;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await minioClient.putObject(bucket, objectName, buffer, buffer.length, {
          "Content-Type": file.type,
        });
        uploadedFiles.push({
          name: objectName,
          size: file.size,
          _tag: "UploadImage",
        });
      }
      return uploadedFiles;
    } catch (error) {
      throw new ValidationError("Image upload failed");
    }
  };
}
