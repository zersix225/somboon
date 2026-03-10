import { Hono } from "hono";
import type { UploadImageService } from "@/types/services/uploadImage";
import * as UploadImagePostRoutes from "@/controllers/uploadImages/post";

export function setupUploadImageRoutes(uploadImageService: UploadImageService) {
  return new Hono().route(
    "/",
    UploadImagePostRoutes.setupUploadRoutes(uploadImageService),
  );
}
