import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { CustomerSchema } from "@/schemas";
import type { CustomerService } from "@/types/services/customer";

const standardCustomerSchema = S.standardSchemaV1(
  CustomerSchema.Schema.omit("created_at", "updated_at"),
);

const docs = describeRoute({
  responses: {
    201: {
      content: {
        "application/json": {
          schema: resolver(standardCustomerSchema),
        },
      },
      description: "Created customer",
    },
  },
  tags: ["Customer"],
});

const validateRequestBody = validator("json", standardCustomerSchema);

export function setupCustomerPostRoutes(customerService: CustomerService) {
  const app = new Hono();

  app.post("/", docs, validateRequestBody, async (c) => {
    const body = c.req.valid("json");
    const result = await customerService.create(body);
    return c.json(result);
  });

  return app;
}
