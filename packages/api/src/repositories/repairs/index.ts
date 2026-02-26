import type { PrismaType } from "@/config/prisma";
import * as Types from "@/types/repositories/repair";
import * as Creates from "@/repositories/repairs/creates";
import * as Finds from "@/repositories/repairs/finds";

export default function initRepairRepository(
  prismaClient: PrismaType,
): Types.RepairRepository {
  return {
    create: Creates.create(prismaClient),
    findAllWithLimit: Finds.findAllWithLimit(prismaClient),
    findRecentActivity: Finds.findRecentActivity(prismaClient),
  };
}
