import type { RepairRepository } from "@/types/repositories/repair";
import type { RepairService } from "@/types/services/repair";
import * as Creates from "@/services/repairs/creates";
import * as Finds from "@/services/repairs/finds";
import type { CustomerRepository } from "@/types/repositories/customer";

export default function initRepairService(
  repairRepository: RepairRepository,
  customerRepository: CustomerRepository,
): RepairService {
  return {
    create: Creates.create(repairRepository, customerRepository),
    findAllWithLimit: Finds.findAllWithLimit(repairRepository),
    findRecentActivity: Finds.findRecentActivity(repairRepository),
    findPagination: Finds.findPagination(repairRepository),
  };
}
