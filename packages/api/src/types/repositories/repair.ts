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

export type CreateRepairDto =
  RepairWithRelationsSchema.CreateRepairWithRelations;
export type UpdateRepairDto = CreateRepairDto & { id?: Repair["id"] };

export type RepairRepository = {
  create: (data: CreateRepairDto) => Promise<Repair>;
  findAllWithLimit: (limit: number) => Promise<RepairArray>;
  findRecentActivity: () => Promise<RepairRecentActivity>;
  findPagination: (
    page: number,
    pageSize: number,
  ) => Promise<RepairWithRelationsSchema.PaginationRepair>;
};
