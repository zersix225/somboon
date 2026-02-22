import { Hono } from "hono";
import { type ApiResponse, successResponse } from "@/utils/response";
import { uploadImage } from "@/services/uploadImage";
import { describeRoute, resolver } from "hono-openapi";
import { Schema as S } from "effect";

export function setupUploadRoutes() {
  const app = new Hono().post("/", async (c) => {
    const formData = await c.req.formData();

    const files = formData.getAll("files");
    const file = files.filter((value): value is File => value instanceof File);
    const result = await uploadImage(file);

    return successResponse(
      c,
      result,
      201,
      "Upload images successfully",
    ) as ApiResponse<typeof result>;
  });
  return app;
}
