import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export type ApiResponseTemplate<T = unknown> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      error: {
        name: string;
        message: string;
        statusCode: number;
      };
    };

export function successResponse<T, S extends ContentfulStatusCode = 200>(
  c: Context,
  data: T,
  statusCode?: S,
  message?: string,
) {
  const response: ApiResponseTemplate<T> = {
    success: true,
    data,
    ...(message && { message }),
  };

  return c.json(response, statusCode || 200);
}

export function errorResponse(
  c: Context,
  message: string,
  statusCode: ContentfulStatusCode = 500,
  errorName: string,
) {
  const response: ApiResponseTemplate = {
    success: false,
    error: {
      name: errorName || "API_ERROR",
      message: message,
      statusCode: statusCode,
    },
  };
  return c.json(response, statusCode);
}

export type ApiResponse<T> =
  | ReturnType<typeof successResponse<T>>
  | ReturnType<typeof errorResponse>;
