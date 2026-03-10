import type { CustomerRepository } from "@/types/repositories/customer";
import type { CustomerService } from "@/types/services/customer";
import * as Creates from "@/services/customers/creates";
import * as Finds from "@/services/customers/finds";
import * as Updates from "@/services/customers/updates";
import * as Removes from "@/services/customers/removes";

export default function initCustomerService(
  customerRepository: CustomerRepository,
): CustomerService {
  return {
    create: Creates.create(customerRepository),
    findAll: Finds.findAll(customerRepository),
    findById: Finds.findById(customerRepository),
    update: Updates.update(customerRepository),
    updatePartial: Updates.updatePartial(customerRepository),
    remove: Removes.remove(customerRepository),
  };
}
