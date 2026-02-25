import type { PrismaType } from "@/config/prisma";
import type { RepairRepository } from "@/types/repositories/repair";
import { RepairSchema, Helpers } from "@/schemas";

export function findAllWithLimit(
  prismaClient: PrismaType,
): RepairRepository["findAllWithLimit"] {
  return async (limit: number) => {
    const result = await prismaClient.repair.findMany({
      take: limit,
    });
    return Helpers.fromObjectToSchema(RepairSchema.SchemaArray)(result);
  };
}
