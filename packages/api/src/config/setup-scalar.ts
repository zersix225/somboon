import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";

export function setupScalarDocs() {
  const app = new Hono().get(
    "/",
    Scalar({
      darkMode: true,
      layout: "modern", // "classic" | "modern" (default)
      pageTitle: "Hono Overtime Tracking API Reference",
      url: "/openapi.json",
      theme: "deepSpace",
    }),
  );

  return app;
}
