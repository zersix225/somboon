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
  RepairSchema.RepairRecentActivitySchema.omit("last"),
);
const getPaginationRepairSchema = S.standardSchemaV1(
  RepairWithRelationsSchema.PaginationSchema,
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

const getByIdDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(getByLimitRepairSchema),
        },
      },
      description: "Get Repair by Id",
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

const getPaginationDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(getPaginationRepairSchema),
        },
      },
      description: "Get Repair with pagination",
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
const validateRequestById = validator(
  "param",
  S.standardSchemaV1(
    S.Struct({
      id: S.String,
    }),
  ),
);
const validatePaginationByQuery = validator(
  "query",
  S.standardSchemaV1(
    S.Struct({
      page: S.String,
      pageSize: S.String,
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
    .get(
      "/paginates",
      getPaginationDocs,
      validatePaginationByQuery,
      async (c) => {
        const { page, pageSize } = c.req.valid("query");

        const result = await repairService.findPagination(
          Number(page),
          Number(pageSize),
        );
        return successResponse(
          c,
          result,
          200,
          "Get repair pagination successfully",
        ) as ApiResponse<typeof result>;
      },
    )
    .get(
      "repairLimit/:limit",
      getByLimitDocs,
      validateRequestByParam,
      async (c) => {
        const { limit } = c.req.valid("param");
        const result = await repairService.findAllWithLimit(Number(limit));
        return successResponse(
          c,
          result,
          200,
          "Get repair all successfully",
        ) as ApiResponse<typeof result>;
      },
    )
    .get("repairId/:id", getByIdDocs, validateRequestById, async (c) => {
      const { id } = c.req.valid("param");
      const result = await repairService.findById(Number(id));
      console.log(result);
      return successResponse(
        c,
        result,
        200,
        "Get repair all successfully",
      ) as ApiResponse<typeof result>;
    });
  return app;
}
