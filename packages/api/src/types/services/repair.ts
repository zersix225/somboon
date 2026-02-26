import type { RepairWithRelationsSchema, RepairSchema } from "@/schemas";

export type RepairService = {
  create: (
    data: RepairWithRelationsSchema.CreateRepairWithRelations,
  ) => Promise<RepairWithRelationsSchema.RepairWithRelations>;
  findAllWithLimit: (
    limit: number,
  ) => Promise<RepairWithRelationsSchema.RepairWithRelationsArray>;
  findRecentActivity: () => Promise<RepairSchema.RepairRecentActivity>;
};
