import type { UploadImageSchema } from "@/schemas";

export type UploadImageService = {
  create: (data: File[]) => Promise<UploadImageSchema.UploadImageArray>;
};
