import type { CustomerRepository } from "@/types/repositories/customer";
import type { CustomerService } from "@/types/services/customer";

export function create(
  customerRepository: CustomerRepository,
): CustomerService["create"] {
  return async (data) => {
    return await customerRepository.create(data);
  };
}
