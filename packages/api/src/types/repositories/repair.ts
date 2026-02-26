import type {
  Branded,
  RepairSchema,
  RepairWithRelationsSchema,
} from "@/schemas";

type Repair = RepairWithRelationsSchema.repairWithRelations;
type RepairArray = RepairWithRelationsSchema.repairWithRelationsArray;

export type CreateRepairDto =
  RepairWithRelationsSchema.CreateRepairWithRelations;
export type UpdateRepairDto = CreateRepairDto & { id?: Repair["id"] };

export type RepairRepository = {
  create: (data: CreateRepairDto) => Promise<Repair>;
  findAllWithLimit: (limit: number) => Promise<RepairArray>;
};
