import type { PrismaType } from "@/config/prisma";
import * as Types from "@/types/repositories/repair";
import * as Creates from "@/repositories/repair/creates";

export default function initRepairRepository(
  prismaClient: PrismaType,
): Types.RepairRepository {
  return {
    create: Creates.create(prismaClient),
  };
}
