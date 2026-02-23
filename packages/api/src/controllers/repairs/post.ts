import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { RepairWithRelationsSchema } from "@/schemas";
import type { RepairService } from "@/types/services/repair";
import { type ApiResponse, successResponse } from "@/utils/response";

const standardRepairSchema = S.standardSchemaV1(
  RepairWithRelationsSchema.Schema,
);

const docs = describeRoute({
  responses: {
    201: {
      content: {
        "application/json": {
          schema: resolver(standardRepairSchema),
        },
      },
      description: "Created repairs",
    },
  },
  tags: ["Repair"],
});

const validateRequestBody = validator(
  "json",
  S.standardSchemaV1(RepairWithRelationsSchema.CreateSchema),
);

export function setupRepairPostRoutes(repairService: RepairService) {
  const app = new Hono().post("/", docs, validateRequestBody, async (c) => {
    const body = c.req.valid("json");
    const result = await repairService.create(body);
    return successResponse(
      c,
      result,
      200,
      "Created repairs successfully",
    ) as ApiResponse<typeof result>;
  });
  return app;
}
