import type {
  Branded,
  CustomerSchema,
  CustomerWithRelationsSchema,
} from "@/schemas";
import type { UpdateCustomerDto } from "@/types/repositories/customer";

export type CustomerService = {
  create: (
    data: CustomerSchema.CreateCustomer,
  ) => Promise<CustomerSchema.Customer>;
  findAll: () => Promise<CustomerSchema.CustomerArray>;
  findById: (id: Branded.CustomerId) => Promise<CustomerSchema.Customer | null>;
  update: (
    id: Branded.CustomerId,
    data: UpdateCustomerDto,
  ) => Promise<CustomerSchema.Customer | null>;
  updatePartial: (
    id: Branded.CustomerId,
    data: Partial<UpdateCustomerDto>,
  ) => Promise<CustomerSchema.Customer | null>;
  remove: (id: Branded.CustomerId) => Promise<CustomerSchema.Customer | null>;
};
