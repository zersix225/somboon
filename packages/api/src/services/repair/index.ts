import type { RepairRepository } from "@/types/repositories/repair";
import type { RepairService } from "@/types/services/repair";
import * as Creates from "@/services/repair/creates";
import type { CustomerRepository } from "@/types/repositories/customer";

export default function initRepairService(
  repairRepository: RepairRepository,
  customerRepository: CustomerRepository,
): RepairService {
  return {
    create: Creates.create(repairRepository, customerRepository),
  };
}
