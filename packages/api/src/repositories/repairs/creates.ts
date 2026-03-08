import type { PrismaType } from "@/config/prisma";
import type { RepairRepository } from "@/types/repositories/repair";
import { RepairWithRelationsSchema, Helpers } from "@/schemas";

export function create(prismaClient: PrismaType): RepairRepository["create"] {
  return async (data) => {
    const result = await prismaClient.repair.create({
      data: {
        ...data,
        service: {
          create: data.service,
        },
      },
      include: {
        service: true,
        customer: true,
      },
    });
    return Helpers.fromObjectToSchema(RepairWithRelationsSchema.Schema)(result);
  };
}
