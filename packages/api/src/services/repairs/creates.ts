import type { RepairRepository } from "@/types/repositories/repair";
import type { RepairService } from "@/types/services/repair";
import type { CustomerRepository } from "@/types/repositories/customer";
import { NotFoundError } from "@/errors";

export function create(
  repairRepository: RepairRepository,
  customerRepository: CustomerRepository,
): RepairService["create"] {
  return async (data) => {
    const customer = await customerRepository.findById(data.customer_id);

    if (!customer) {
      throw new NotFoundError("Customer Id not found");
    }
    return repairRepository.create(data);
  };
}
