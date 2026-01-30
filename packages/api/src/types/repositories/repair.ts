import type {
  Branded,
  RepairSchema,
  RepairWithRelationsSchema,
} from "@/schemas";

type Repair = RepairWithRelationsSchema.repairWithRelations;

export type CreateRepairDto =
  RepairWithRelationsSchema.CreateRepairWithRelations;
export type UpdateRepairDto = CreateRepairDto & { id?: Repair["id"] };

export type RepairRepository = {
  create: (data: CreateRepairDto) => Promise<Repair>;
};
