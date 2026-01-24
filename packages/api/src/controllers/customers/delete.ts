import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { Branded, CustomerSchema } from "@/schemas";
import type { CustomerService } from "@/types/services/customer";
import { successResponse } from "@/utils/response";

const standardCustomerSchema = S.standardSchemaV1(CustomerSchema.Schema);

const deleteDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(standardCustomerSchema),
        },
      },
      description: "Updated customer",
    },
  },
  tags: ["Customer"],
});

const validateRequestByParam = validator(
  "param",
  S.standardSchemaV1(
    S.Struct({
      customerId: Branded.CustomerIdFromString,
    }),
  ),
);

export function setupCustomerDeleteRoutes(customerService: CustomerService) {
  const app = new Hono();

  app.delete("/:customerId", deleteDocs, validateRequestByParam, async (c) => {
    const { customerId } = c.req.valid("param");
    const result = await customerService.remove(customerId);

    return successResponse(c, result, 200, "Deleted customer successfully");
  });

  return app;
}
