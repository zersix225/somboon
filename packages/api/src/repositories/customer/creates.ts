import type { PrismaClientType } from "@repo/prisma";
import type { CustomerRepository } from "@/types/repositories/customer";
import { CustomerSchema, Helpers } from "@/schemas";

export function create(
  prismaClient: PrismaClientType,
): CustomerRepository["create"] {
  return async (data) => {
    const result = await prismaClient.customer.create({
      data,
    });
    return Helpers.fromObjectToSchema(CustomerSchema.Schema)(result);
  };
}
