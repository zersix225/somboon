import type {
  Branded,
  CustomerSchema,
  CustomerWithRelationsSchema,
} from "@/schemas";

type Customer = CustomerSchema.Customer;
type CustomerArray = CustomerSchema.CustomerArray;
export type CustomerWithoutId = Omit<Customer, "id">;

export type CreateCustomerDto = Omit<
  Customer,
  "id" | "created_at" | "updated_at" | "_tag"
>;
export type UpdateCustomerDto = CreateCustomerDto & { id?: Customer["id"] };

export type CustomerRepository = {
  create: (data: CreateCustomerDto) => Promise<Customer>;
  existData: (data: CreateCustomerDto) => Promise<Customer | null>;
};
