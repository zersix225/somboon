import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { CustomerSchema } from "@/schemas";
import type { CustomerService } from "@/types/services/customer";
import { successResponse } from "@/utils/response";

const standardCustomerSchema = S.standardSchemaV1(CustomerSchema.Schema);

const updateDocs = describeRoute({
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

const validateRequestBody = validator(
  "json",
  S.standardSchemaV1(CustomerSchema.UpdateSchema),
);

export function setupCustomerPatchRoutes(customerService: CustomerService) {
  const app = new Hono().patch(
    "/",
    updateDocs,
    validateRequestBody,
    async (c) => {
      const body = c.req.valid("json");
      const result = await customerService.updatePartial(body.id, body);

      return successResponse(
        c,
        result,
        200,
        "Updated customer by Id successfully",
      );
    },
  );

  return app;
}
