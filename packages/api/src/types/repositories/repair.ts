import type {
  Branded,
  RepairSchema,
  RepairWithRelationsSchema,
} from "@/schemas";

type Repair = RepairWithRelationsSchema.RepairWithRelations;
type RepairArray = RepairWithRelationsSchema.RepairWithRelationsArray;
type RepairRecentActivity = Omit<
  RepairSchema.RepairRecentActivity,
  "growthRate"
>;

type CreateRepair = RepairWithRelationsSchema.CreateRepairWithRelations;
type UpdateRepair = RepairSchema.UpdateRepair;
type PaginationRepair = RepairWithRelationsSchema.PaginationRepair;

export type RepairRepository = {
  create: (data: CreateRepair) => Promise<Repair>;
  findAllWithLimit: (limit: number) => Promise<RepairArray>;
  findAll: () => Promise<RepairArray>;
  findRecentActivity: () => Promise<RepairRecentActivity>;
  findPagination: (page: number, pageSize: number) => Promise<PaginationRepair>;
  findById: (id: number) => Promise<Repair>;
  remove: (id: Branded.RepairId) => Promise<Repair | null>;
  updatePartial: (
    id: Branded.RepairId,
    data: UpdateRepair,
  ) => Promise<RepairSchema.Repair>;
};
