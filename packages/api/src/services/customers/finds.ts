import type { CustomerRepository } from "@/types/repositories/customer";
import type { CustomerService } from "@/types/services/customer";
import { ValidationError } from "@/errors";

export function findAll(
  customerRepository: CustomerRepository,
): CustomerService["findAll"] {
  return async () => {
    return await customerRepository.findAll();
  };
}

export function findById(
  customerRepository: CustomerRepository,
): CustomerService["findById"] {
  return async (id) => {
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new ValidationError(`Customer not found of id ${id}`);
    }

    return customer;
  };
}
