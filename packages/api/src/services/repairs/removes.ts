import type { RepairRepository } from "@/types/repositories/repair";
import type { RepairService } from "@/types/services/repair";
import { NotFoundError, ValidationError } from "@/errors";

export function remove(
  repairRepository: RepairRepository,
): RepairService["remove"] {
  return async (id) => {
    const result = await repairRepository.remove(id);
    if (!result) {
      throw new NotFoundError(`Repair not found of id ${id}`);
    }
    return result;
  };
}
