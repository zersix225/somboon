import type { Hono } from "hono";
import { openAPIRouteHandler } from "hono-openapi";

export function setupOpenApi(app: Hono) {
  app.get(
    "/openapi.json",
    openAPIRouteHandler(app, {
      documentation: {
        info: {
          description: "API for greeting users",
          title: "Hono",
          version: "1.0.0",
        },
        servers: [
          {
            description: "Local server",
            url: "http://localhost:3000",
          },
          {
            description: "Prod server",
            url: "https://api.app.com",
          },
        ],
      },
    }),
  );
  return app;
}
