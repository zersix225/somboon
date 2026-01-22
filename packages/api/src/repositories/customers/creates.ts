import type { PrismaType } from "@/configure/client";
import type { CustomerRepository } from "@/types/repositories/customer";
import { CustomerSchema, Helpers } from "@/schemas";

export function create(prismaClient: PrismaType): CustomerRepository["create"] {
  return async (data) => {
    const result = await prismaClient.customer.create({
      data,
    });
    return Helpers.fromObjectToSchema(CustomerSchema.Schema)(result);
  };
}
