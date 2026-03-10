import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { AppError, InternalServerError } from "@/errors";
import { errorResponse } from "@/utils/response";
import config from "@/config/env";

export function errorHandler(err: Error, c: Context) {
  if (err instanceof AppError) {
    return errorResponse(
      c,
      err.toJSON().message,
      err.toJSON().statusCode as ContentfulStatusCode,
      err.toJSON().name,
    );
  }

  const internalError = new InternalServerError(
    config.nodeEnv === "development" ? err.message : "Something went wrong",
  );

  if (config.nodeEnv === "development") {
    console.error("Unhandled error:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
  }

  return c.json(
    internalError.toJSON(),
    internalError.statusCode as ContentfulStatusCode,
  );
}
