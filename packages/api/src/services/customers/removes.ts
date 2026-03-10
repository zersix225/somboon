import type { CustomerRepository } from "@/types/repositories/customer";
import type { CustomerService } from "@/types/services/customer";
import { NotFoundError } from "@/errors";

export function remove(
  customerRepository: CustomerRepository,
): CustomerService["remove"] {
  return async (id) => {
    const customer = await customerRepository.remove(id);
    if (!customer) throw new NotFoundError(`Customer not found with id ${id}`);
    return customer;
  };
}
