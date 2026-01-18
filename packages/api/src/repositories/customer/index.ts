import type { PrismaClientType } from "@repo/prisma";
import * as Types from "@/types/repositories/customer";
import * as Creates from "@/repositories/customer/creates";

export default function initCustomerRepository(
  prismaClient: PrismaClientType,
): Types.CustomerRepository {
  return {
    create: Creates.create(prismaClient),
  };
}
