import type { PrismaType } from "@/config/prisma";
import type { RepairRepository } from "@/types/repositories/repair";
import { RepairWithRelationsSchema, Helpers } from "@/schemas";
import { Prisma } from "@prisma/client/extension";

export function remove(prismaClient: PrismaType): RepairRepository["remove"] {
  return async (id) => {
    const existRepair = await prismaClient.repair.findUnique({
      where: { id },
    });
    if (!existRepair) return null;
    const result = await prismaClient.$transaction(
      async (tx: Prisma.TransactionClient) => {
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
      },
    );
    return Helpers.fromObjectToSchema(RepairWithRelationsSchema.Schema)(result);
  };
}
