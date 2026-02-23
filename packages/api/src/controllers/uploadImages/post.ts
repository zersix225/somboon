import { Hono } from "hono";
import { type ApiResponse, successResponse } from "@/utils/response";
import type { UploadImageService } from "@/types/services/uploadImage";
import { describeRoute, resolver } from "hono-openapi";
import { Schema as S } from "effect";

export function setupUploadRoutes(uploadImageService: UploadImageService) {
  const app = new Hono().post("/", async (c) => {
    const formData = await c.req.formData();

    const files = formData.getAll("files");
    const file = files.filter((value): value is File => value instanceof File);
    const result = await uploadImageService.create(file);

    return successResponse(
      c,
      result,
      201,
      "Upload images successfully",
    ) as ApiResponse<typeof result>;
  });
  return app;
}
