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
    const repair = await repairRepository.findRecentActivity();
    const growthRate =
      repair.past > 0 ? ((repair.recent - repair.past) / repair.past) * 100 : 0;

    return {
      total: repair.total,
      recent: repair.recent,
      growthRate: growthRate.toFixed(3),
    };
  };
}
