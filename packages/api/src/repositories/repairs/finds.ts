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

export function findRecentActivity(
  prismaClient: PrismaType,
): RepairRepository["findRecentActivity"] {
  return async () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [total, recent] = await Promise.all([
      prismaClient.repair.count(),
      prismaClient.repair.count({
        where: {
          created_at: { gte: oneDayAgo },
        },
      }),
    ]);

    return {
      total,
      recent,
      growthRate: total > 0 ? (recent / total) * 100 : 0,
    };
  };
}
