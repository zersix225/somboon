import { Hono } from "hono";
import { hc } from "hono/client";
import { setupOpenApi } from "@/configure/setup-openapi";
import { setupScalarDocs } from "@/configure/setup-scalar";

const app = new Hono();
setupOpenApi(app);

app.route("/docs", setupScalarDocs());

export const routes = app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export type App = typeof routes;
export const honoClient = (apiUrl: string) => hc<App>(apiUrl);
