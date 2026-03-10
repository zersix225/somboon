import type { PrismaType } from "@/config/prisma";
import type { CustomerRepository } from "@/types/repositories/customer";
import { CustomerSchema, Helpers } from "@/schemas";

export function findAll(
  prismaClient: PrismaType,
): CustomerRepository["findAll"] {
  return async () => {
    const result = await prismaClient.customer.findMany();
    return Helpers.fromObjectToSchema(CustomerSchema.SchemaArray)(result);
  };
}

export function findById(
  prismaClient: PrismaType,
): CustomerRepository["findById"] {
  return async (id) => {
    const result = await prismaClient.customer.findUnique({
      where: {
        id,
      },
    });
    if (!result) return null;
    return Helpers.fromObjectToSchema(CustomerSchema.Schema)(result);
  };
}
