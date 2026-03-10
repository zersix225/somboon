import type { PrismaType } from "@/config/prisma";
import * as Types from "@/types/repositories/repair";
import * as Creates from "@/repositories/repairs/creates";
import * as Finds from "@/repositories/repairs/finds";
import * as Removes from "@/repositories/repairs/removes";
import * as Updates from "@/repositories/repairs/updates";

export default function initRepairRepository(
  prismaClient: PrismaType,
): Types.RepairRepository {
  return {
    create: Creates.create(prismaClient),
    findAllWithLimit: Finds.findAllWithLimit(prismaClient),
    findAll: Finds.findAll(prismaClient),
    findRecentActivity: Finds.findRecentActivity(prismaClient),
    findPagination: Finds.findPagination(prismaClient),
    findById: Finds.findById(prismaClient),
    remove: Removes.remove(prismaClient),
    updatePartial: Updates.updatePartial(prismaClient),
  };
}
