import type { RepairRepository } from "@/types/repositories/repair";
import type { RepairService } from "@/types/services/repair";
import { NotFoundError } from "@/errors";

export function updatePartial(
  repairRepository: RepairRepository,
): RepairService["updatePartial"] {
  return async (id, data) => {
    const existData = await repairRepository.findById(id);
    if (!existData) {
      throw new NotFoundError(`Customer not found of id ${id}`);
    }

    return await repairRepository.updatePartial(id, data);
  };
}
