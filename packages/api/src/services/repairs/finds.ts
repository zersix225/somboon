import type { RepairRepository } from "@/types/repositories/repair";
import type { RepairService } from "@/types/services/repair";

export function findAllWithLimit(
  repairRepository: RepairRepository,
): RepairService["findAllWithLimit"] {
  return async (limit) => {
    return await repairRepository.findAllWithLimit(limit);
  };
}

export function findById(
  repairRepository: RepairRepository,
): RepairService["findById"] {
  return async (id) => {
    return await repairRepository.findById(id);
  };
}

export function findRecentActivity(
  repairRepository: RepairRepository,
): RepairService["findRecentActivity"] {
  return async () => {
    const repair = await repairRepository.findRecentActivity();
    const growthRate =
      repair.last > 0
        ? ((repair.current - repair.last) * 100) / repair.last
        : 0;

    return {
      total: repair.total,
      currentRepair: repair.currentRepair,
      current: repair.current,
      last: repair.last,
      growthRate: growthRate.toFixed(3),
    };
  };
}

export function findPagination(
  repairRepository: RepairRepository,
): RepairService["findPagination"] {
  return async (page, pageSize) => {
    return repairRepository.findPagination(page, pageSize);
  };
}
