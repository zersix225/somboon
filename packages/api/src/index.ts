import { prismaClient } from "@repo/prisma";
import { Hono } from "hono";
import { hc } from "hono/client";

const app = new Hono();

export const routes = app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/users", async (c) => {
    const users = await prismaClient.user.findMany();
    console.log({ users });
    return c.json(users);
  })
  .get("/cameras", (c) => {
    return c.json([
      {
        brand: "Canon",
        model: "R1",
      },
      {
        brand: "Sony",
        model: "A9",
      },
      {
        brand: "Nikon",
        model: "Z9",
      },
    ]);
  });
export type App = typeof routes;
export const honoClient = (apiUrl: string) => hc<App>(apiUrl);
