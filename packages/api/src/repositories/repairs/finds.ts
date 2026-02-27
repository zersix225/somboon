import type { PrismaType } from "@/config/prisma";
import type { RepairRepository } from "@/types/repositories/repair";
import { RepairWithRelationsSchema, Helpers } from "@/schemas";
import { now } from "effect/DateTime";

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [total, recent, past] = await Promise.all([
      prismaClient.repair.count(),
      prismaClient.repair.count({
        where: {
          created_at: {
            gte: today,
          },
        },
      }),
      prismaClient.repair.count({
        where: {
          created_at: {
            gte: yesterday,
            lt: today,
          },
        },
      }),
    ]);

    return {
      total,
      recent,
      past,
    };
  };
}
