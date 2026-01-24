import type { CustomerRepository } from "@/types/repositories/customer";
import type { CustomerService } from "@/types/services/customer";

export function remove(
  customerRepository: CustomerRepository,
): CustomerService["remove"] {
  return async (id) => {
    return await customerRepository.remove(id);
  };
}
