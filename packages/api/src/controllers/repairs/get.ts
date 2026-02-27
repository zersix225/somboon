import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { RepairWithRelationsSchema, RepairSchema } from "@/schemas";
import type { RepairService } from "@/types/services/repair";
import { type ApiResponse, successResponse } from "@/utils/response";

const getByLimitRepairSchema = S.standardSchemaV1(
  RepairWithRelationsSchema.SchemaArray,
);
const getRecentActivitySchema = S.standardSchemaV1(
  RepairSchema.RepairRecentActivitySchema.omit("past"),
);

const getByLimitDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(getByLimitRepairSchema),
        },
      },
      description: "Get Repair by Limit",
    },
    404: {
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
      description: "Can not find Repair",
    },
  },
  tags: ["Repair"],
});

const getRecentActivityDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(getRecentActivitySchema),
        },
      },
      description: "Get Repair recent activity",
    },
  },
  tags: ["Repair"],
});

const validateRequestByParam = validator(
  "param",
  S.standardSchemaV1(
    S.Struct({
      limit: S.String,
    }),
  ),
);

export function setupRepairGetRoutes(repairService: RepairService) {
  const app = new Hono()
    .get("/activities", getRecentActivityDocs, async (c) => {
      const result = await repairService.findRecentActivity();
      return successResponse(
        c,
        result,
        200,
        "Get repair activity successfully",
      ) as ApiResponse<typeof result>;
    })
    .get("/:limit", getByLimitDocs, validateRequestByParam, async (c) => {
      const { limit } = c.req.valid("param");
      const result = await repairService.findAllWithLimit(Number(limit));
      return successResponse(
        c,
        result,
        200,
        "Get repair all successfully",
      ) as ApiResponse<typeof result>;
    });

  return app;
}
