import type { PrismaType } from "@/config/prisma";
import type { RepairRepository } from "@/types/repositories/repair";
import { RepairWithRelationsSchema, Helpers } from "@/schemas";

export function findAllWithLimit(
  prismaClient: PrismaType,
): RepairRepository["findAllWithLimit"] {
  return async (limit: number) => {
    const result = await prismaClient.repair.findMany({
      take: limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        service: true,
        customer: true,
      },
    });
    return Helpers.fromObjectToSchema(RepairWithRelationsSchema.SchemaArray)(
      result,
    );
  };
}
