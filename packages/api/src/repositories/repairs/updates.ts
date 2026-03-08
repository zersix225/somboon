import type { PrismaType } from "@/config/prisma";
import type { RepairRepository } from "@/types/repositories/repair";
import { RepairSchema, Helpers } from "@/schemas";

// export function update(prismaClient: PrismaType): RepairRepository["update"] {
//     return async (id, data) => {
//         const result = await prismaClient.customer.update({
//             data,
//             where: {
//                 id,
//             },
//         });
//         return Helpers.fromObjectToSchema(CustomerSchema.Schema)(result);
//     };
// }

export function updatePartial(
  prismaClient: PrismaType,
): RepairRepository["updatePartial"] {
  return async (id, data) => {
    const result = await prismaClient.repair.update({
      data,
      where: {
        id,
      },
    });
    return Helpers.fromObjectToSchema(RepairSchema.Schema)(result);
  };
}
