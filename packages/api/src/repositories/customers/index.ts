import type { PrismaType } from "@/config/prisma";
import * as Types from "@/types/repositories/customer";
import * as Creates from "@/repositories/customers/creates";
import * as Finds from "@/repositories/customers/finds";
import * as Updates from "@/repositories/customers/updates";
import * as Removes from "@/repositories/customers/removes";

export default function initCustomerRepository(
  prismaClient: PrismaType,
): Types.CustomerRepository {
  return {
    create: Creates.create(prismaClient),
    existData: Creates.existData(prismaClient),
    findAll: Finds.findAll(prismaClient),
    findById: Finds.findById(prismaClient),
    update: Updates.update(prismaClient),
    updatePartial: Updates.updatePartial(prismaClient),
    remove: Removes.remove(prismaClient),
  };
}
