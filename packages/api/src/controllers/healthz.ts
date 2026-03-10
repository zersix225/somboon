import { Schema as S } from "effect";
import { Hono } from "hono";
import { describeRoute, resolver } from "hono-openapi";

const responseSchema = S.Struct({
  message: S.Literal("Ok"),
});

const doc = describeRoute({
  description: "Are we healthy?",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(S.standardSchemaV1(responseSchema)),
        },
      },
      description: "Healthy",
    },
  },
});

const healthzApp = new Hono().get("/", doc, (c) => {
  return c.json(
    {
      message: "Ok",
    },
    200,
  );
});

export default healthzApp;
