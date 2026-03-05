import type { RepairWithRelationsSchema, RepairSchema } from "@/schemas";

type RepairWithoutPast = Omit<RepairSchema.RepairRecentActivity, "past">;

export type RepairService = {
  create: (
    data: RepairWithRelationsSchema.CreateRepairWithRelations,
  ) => Promise<RepairWithRelationsSchema.RepairWithRelations>;
  findAllWithLimit: (
    limit: number,
  ) => Promise<RepairWithRelationsSchema.RepairWithRelationsArray>;
  findRecentActivity: () => Promise<RepairWithoutPast>;
  findPagination: (
    page: number,
    pageSize: number,
  ) => Promise<RepairWithRelationsSchema.PaginationRepair>;
  findById: (
    id: number,
  ) => Promise<RepairWithRelationsSchema.RepairWithRelations>;
};
