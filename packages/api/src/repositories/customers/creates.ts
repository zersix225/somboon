import type { PrismaType } from "@/config/prisma";
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

export function existData(
  prismaClient: PrismaType,
): CustomerRepository["existData"] {
  return async (data) => {
    const result = await prismaClient.customer.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });
    if (!result) return null;
    return Helpers.fromObjectToSchema(CustomerSchema.Schema)(result);
  };
}
