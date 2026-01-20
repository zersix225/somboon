import type { PrismaType } from "@repo/prisma";
import * as Types from "@/types/repositories/customer";
import * as Creates from "@/repositories/customers/creates";

export default function initCustomerRepository(
  prismaClient: PrismaType,
): Types.CustomerRepository {
  return {
    create: Creates.create(prismaClient),
  };
}
