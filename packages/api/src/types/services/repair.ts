import type { RepairWithRelationsSchema, RepairSchema } from "@/schemas";

export type RepairService = {
  create: (
    data: RepairWithRelationsSchema.CreateRepairWithRelations,
  ) => Promise<RepairWithRelationsSchema.repairWithRelations>;
  findAllWithLimit: (limit: number) => Promise<RepairSchema.RepairArray>;
};
