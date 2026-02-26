import type { RepairRepository } from "@/types/repositories/repair";
import type { RepairService } from "@/types/services/repair";

export function findAllWithLimit(
  repairRepository: RepairRepository,
): RepairService["findAllWithLimit"] {
  return async (limit) => {
    return await repairRepository.findAllWithLimit(limit);
  };
}

export function findRecentActivity(
  repairRepository: RepairRepository,
): RepairService["findRecentActivity"] {
  return async () => {
    return await repairRepository.findRecentActivity();
  };
}
