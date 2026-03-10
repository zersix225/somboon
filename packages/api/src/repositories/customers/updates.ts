import type { PrismaType } from "@/config/prisma";
import type { CustomerRepository } from "@/types/repositories/customer";
import { CustomerSchema, Helpers } from "@/schemas";

export function update(prismaClient: PrismaType): CustomerRepository["update"] {
  return async (id, data) => {
    const result = await prismaClient.customer.update({
      data,
      where: {
        id,
      },
    });
    return Helpers.fromObjectToSchema(CustomerSchema.Schema)(result);
  };
}

export function updatePartial(
  prismaClient: PrismaType,
): CustomerRepository["updatePartial"] {
  return async (id, data) => {
    const result = await prismaClient.customer.update({
      data,
      where: {
        id,
      },
    });
    return Helpers.fromObjectToSchema(CustomerSchema.Schema)(result);
  };
}
