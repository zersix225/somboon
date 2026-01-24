import type { CustomerRepository } from "@/types/repositories/customer";
import type { CustomerService } from "@/types/services/customer";
import { ValidationError } from "@/errors";

export function create(
  customerRepository: CustomerRepository,
): CustomerService["create"] {
  return async (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === "") {
        throw new ValidationError(`${key} is required`);
      }
    }

    const existData = await customerRepository.existData(data);

    if (existData) {
      throw new ValidationError("Customer is already exist");
    }
    return await customerRepository.create(data);
  };
}
