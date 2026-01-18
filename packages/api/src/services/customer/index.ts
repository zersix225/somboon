import type { CustomerRepository } from "@/types/repositories/customer";
import type { CustomerService } from "@/types/services/customer";
import * as Creates from "@/services/customer/creates";

export default function initCustomerService(
  customerRepository: CustomerRepository,
): CustomerService {
  return {
    create: Creates.create(customerRepository),
  };
}
