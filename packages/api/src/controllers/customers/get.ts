import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { CustomerSchema, Branded } from "@/schemas";
import type { CustomerService } from "@/types/services/customer";
import { type ApiResponse, successResponse } from "@/utils/response";

const getAllCustomerSchema = S.standardSchemaV1(CustomerSchema.SchemaArray);

const getAllDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(getAllCustomerSchema),
        },
      },
      description: "Find All customer",
    },
  },
  tags: ["Customer"],
});

const getByIdCustomerSchema = S.standardSchemaV1(CustomerSchema.Schema);

const getByIdDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(getByIdCustomerSchema),
        },
      },
      description: "Get Customer by CustomerId",
    },
    400: {
      content: {
        "application/json": {
          schema: resolver(
            S.standardSchemaV1(
              S.Struct({
                message: S.String,
              }),
            ),
          ),
        },
      },
      description: "Get Customer by CustomerId",
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

export function setupCustomerGetRoutes(customerService: CustomerService) {
  const app = new Hono()
    .get("/", getAllDocs, async (c) => {
      const result = await customerService.findAll();
      return successResponse(
        c,
        result,
        200,
        "Get customer all successfully",
      ) as ApiResponse<typeof result>;
    })
    .get("/:customerId", getByIdDocs, validateRequestByParam, async (c) => {
      const { customerId } = c.req.valid("param");
      const result = await customerService.findById(customerId);

      return successResponse(
        c,
        result,
        200,
        "Get customer by Id successfully",
      ) as ApiResponse<typeof result>;
    });

  return app;
}
