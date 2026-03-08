import type { PrismaType } from "@/config/prisma";
import type { RepairRepository } from "@/types/repositories/repair";
import { RepairWithRelationsSchema, Helpers } from "@/schemas";

export function remove(prismaClient: PrismaType): RepairRepository["remove"] {
  return async (id) => {
    const existRepair = await prismaClient.repair.findUnique({
      where: { id },
    });
    if (!existRepair) return null;
    const result = await prismaClient.$transaction(async (tx) => {
      await tx.service.deleteMany({
        where: { repair_id: id },
      });

      return tx.repair.delete({
        where: { id },
        include: {
          service: true,
          customer: true,
        },
      });
    });
    return Helpers.fromObjectToSchema(RepairWithRelationsSchema.Schema)(result);
  };
}
