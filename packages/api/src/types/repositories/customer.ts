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
  findAll: () => Promise<CustomerArray>;
  findById: (id: Branded.CustomerId) => Promise<Customer | null>;
  update: (
    id: Branded.CustomerId,
    data: UpdateCustomerDto,
  ) => Promise<Customer | null>;
  updatePartial: (
    id: Branded.CustomerId,
    data: Partial<UpdateCustomerDto>,
  ) => Promise<Customer | null>;
  remove: (id: Branded.CustomerId) => Promise<Customer | null>;
  existData: (data: CreateCustomerDto) => Promise<Customer | null>;
};
