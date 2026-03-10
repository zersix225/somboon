import type { CustomerRepository } from "@/types/repositories/customer";
import type { CustomerService } from "@/types/services/customer";
import { ValidationError } from "@/errors";

export function update(
  customerRepository: CustomerRepository,
): CustomerService["update"] {
  return async (id, data) => {
    const existData = await customerRepository.findById(id);
    if (!existData) {
      throw new ValidationError(`customer not found of id ${id}`);
    }

    for (const [_, value] of Object.entries(data)) {
      if (value === undefined || value === "") {
        throw new ValidationError("All fields are required");
      }
    }
    return await customerRepository.update(id, data);
  };
}

export function updatePartial(
  customerRepository: CustomerRepository,
): CustomerService["updatePartial"] {
  return async (id, data) => {
    const existData = await customerRepository.findById(id);
    if (!existData) {
      throw new ValidationError(`Customer not found of id ${id}`);
    }

    return await customerRepository.updatePartial(id, data);
  };
}
