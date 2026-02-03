import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { CustomerSchema } from "@/schemas";
import type { CustomerService } from "@/types/services/customer";
import { type ApiResponse, successResponse } from "@/utils/response";

const standardCustomerSchema = S.standardSchemaV1(CustomerSchema.Schema);

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

const validateRequestBody = validator(
  "json",
  S.standardSchemaV1(CustomerSchema.CreateSchema),
);

export function setupCustomerPostRoutes(customerService: CustomerService) {
  const app = new Hono().post("/", docs, validateRequestBody, async (c) => {
    const body = c.req.valid("json");
    const result = await customerService.create(body);
    return successResponse(
      c,
      result,
      200,
      "Created customer successfully",
    ) as ApiResponse<typeof result>;
  });

  return app;
}
