import type { PrismaType } from "@/config/prisma";
import type { CustomerRepository } from "@/types/repositories/customer";
import { CustomerSchema, Helpers } from "@/schemas";

export function remove(prismaClient: PrismaType): CustomerRepository["remove"] {
  return async (id) => {
    const result = await prismaClient.customer.delete({
      where: {
        id,
      },
    });
    return Helpers.fromObjectToSchema(CustomerSchema.Schema)(result);
  };
}
