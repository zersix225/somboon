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
    return Helpers.fromObjectToSchema(
      RepairWithRelationsSchema.RepairWithRelationsSchemaArray,
    )(result);
  };
}

export function findById(
  prismaClient: PrismaType,
): RepairRepository["findById"] {
  return async (id) => {
    const repair = await prismaClient.repair.findUnique({
      where: {
        id,
      },
      include: {
        service: true,
      },
    });
    const customer = await prismaClient.customer.findUnique({
      where: { id: repair?.customer_id },
    });

    const result = {
      ...repair,
      customer: customer,
    };
    return Helpers.fromObjectToSchema(RepairWithRelationsSchema.Schema)(result);
  };
}

export function findRecentActivity(
  prismaClient: PrismaType,
): RepairRepository["findRecentActivity"] {
  return async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentWeek = new Date(today);
    currentWeek.setDate(currentWeek.getDate() - 7);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 14);

    const [total, currentRepair, current, last] = await Promise.all([
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
            gte: currentWeek,
          },
        },
      }),
      prismaClient.repair.count({
        where: {
          created_at: {
            gte: lastWeek,
            lt: currentWeek,
          },
        },
      }),
    ]);

    return {
      total,
      currentRepair,
      current,
      last,
    };
  };
}

export function findPagination(
  prismaClient: PrismaType,
): RepairRepository["findPagination"] {
  return async (page, pageSize) => {
    const skip = (page - 1) * pageSize;

    const [totalCount, result] = await prismaClient.$transaction([
      prismaClient.repair.count(),
      prismaClient.repair.findMany({
        orderBy: {
          created_at: "desc",
        },
        skip,
        take: pageSize,
        include: {
          service: true,
          customer: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);
    const baseUrl = "/repairs/pagination";
    const items = Helpers.fromObjectToSchema(
      RepairWithRelationsSchema.RepairWithRelationsSchemaArray,
    )(result);

    return {
      items,
      totalCount,
      totalPages,
      _links: {
        self: `${baseUrl}?page=${page}`,
        next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
        prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      },
    };
  };
}
