import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as S from "effect/Schema";
import { Branded, RepairWithRelationsSchema } from "@/schemas";
import type { RepairService } from "@/types/services/repair";
import { successResponse } from "@/utils/response";

const standardRepairSchema = S.standardSchemaV1(
  RepairWithRelationsSchema.Schema,
);

const deleteDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(standardRepairSchema),
        },
      },
      description: "Deleted repair",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(standardRepairSchema),
        },
      },
      description: "Not found id",
    },
  },
  tags: ["Repair"],
});

const validateRequestByParam = validator(
  "param",
  S.standardSchemaV1(
    S.Struct({
      id: Branded.RepairIdFromString,
    }),
  ),
);

export function setupRepairDeleteRoutes(repairService: RepairService) {
  const app = new Hono().delete(
    "/:id",
    deleteDocs,
    validateRequestByParam,
    async (c) => {
      const { id } = c.req.valid("param");
      const result = await repairService.remove(id);

      return successResponse(c, result, 200, "Deleted repair successfully");
    },
  );

  return app;
}
