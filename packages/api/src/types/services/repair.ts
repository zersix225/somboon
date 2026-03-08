import type {
  RepairWithRelationsSchema,
  RepairSchema,
  Branded,
} from "@/schemas";

type CreateRepair = RepairWithRelationsSchema.CreateRepairWithRelations;
type Repair = RepairWithRelationsSchema.RepairWithRelations;
type RepairArray = RepairWithRelationsSchema.RepairWithRelationsArray;

type RepairWithoutPast = Omit<RepairSchema.RepairRecentActivity, "past">;
type UpdateRepair = RepairSchema.UpdateRepair;
type PaginationRepair = RepairWithRelationsSchema.PaginationRepair;

export type RepairService = {
  create: (data: CreateRepair) => Promise<Repair>;
  findAllWithLimit: (limit: number) => Promise<RepairArray>;
  findRecentActivity: () => Promise<RepairWithoutPast>;
  findPagination: (page: number, pageSize: number) => Promise<PaginationRepair>;
  findById: (id: Branded.RepairId) => Promise<Repair>;
  remove: (id: Branded.RepairId) => Promise<Repair>;
  updatePartial: (
    id: Branded.RepairId,
    data: UpdateRepair,
  ) => Promise<RepairSchema.Repair>;
};
