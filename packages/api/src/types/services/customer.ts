import type {
  Branded,
  CustomerSchema,
  CustomerWithRelationsSchema,
} from "@/schemas";

export type CustomerService = {
  create: (
    data: CustomerSchema.CreateCustomer,
  ) => Promise<CustomerSchema.Customer>;
};
