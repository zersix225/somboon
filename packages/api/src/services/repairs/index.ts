import type { RepairRepository } from "@/types/repositories/repair";
import type { RepairService } from "@/types/services/repair";
import * as Creates from "@/services/repairs/creates";
import * as Finds from "@/services/repairs/finds";
import * as Removes from "@/services/repairs/removes";
import * as Updates from "@/services/repairs/updates";
import type { CustomerRepository } from "@/types/repositories/customer";

export default function initRepairService(
  repairRepository: RepairRepository,
  customerRepository: CustomerRepository,
): RepairService {
  return {
    create: Creates.create(repairRepository, customerRepository),
    findAllWithLimit: Finds.findAllWithLimit(repairRepository),
    findAll: Finds.findAll(repairRepository),
    findRecentActivity: Finds.findRecentActivity(repairRepository),
    findPagination: Finds.findPagination(repairRepository),
    findById: Finds.findById(repairRepository),
    remove: Removes.remove(repairRepository),
    updatePartial: Updates.updatePartial(repairRepository),
  };
}
