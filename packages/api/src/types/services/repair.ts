import type { RepairWithRelationsSchema } from "@/schemas";

export type RepairService = {
  create: (
    data: RepairWithRelationsSchema.CreateRepairWithRelations,
  ) => Promise<RepairWithRelationsSchema.repairWithRelations>;
};
