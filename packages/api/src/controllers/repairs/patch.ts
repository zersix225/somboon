import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { RepairSchema } from "@/schemas";
import type { RepairService } from "@/types/services/repair";
import { successResponse } from "@/utils/response";

const standardCustomerSchema = S.standardSchemaV1(RepairSchema.Schema);

const updateDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(standardCustomerSchema),
        },
      },
      description: "Updated repair",
    },
  },
  tags: ["Repair"],
});

const validateRequestBody = validator(
  "json",
  S.standardSchemaV1(RepairSchema.UpdateSchema),
);

export function setupRepairPatchRoutes(repairService: RepairService) {
  const app = new Hono().patch(
    "/",
    updateDocs,
    validateRequestBody,
    async (c) => {
      const body = c.req.valid("json");
      const result = await repairService.updatePartial(body.id, body);

      return successResponse(
        c,
        result,
        200,
        "Updated repair by Id successfully",
      );
    },
  );

  return app;
}
