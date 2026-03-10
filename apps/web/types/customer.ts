import { z } from "zod";

const Schema = z.object({
  id: z.number(),
  first_name: z
    .string()
    .min(3, { error: "Firstname is must be at least 3 characters" }),
  last_name: z
    .string()
    .min(3, { error: "Lastname is must be at least 3 characters" }),
  phone: z
    .string()
    .regex(/^0.{9}$/, { error: "Phone must be exactly 10 characters" }),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    error: "Invalid email address",
  }),
  created_at: z.string(),
  updated_at: z.string(),
  _tag: z.string(),
});

export type Customer = z.infer<typeof Schema>;

const CustomerArraySchema = z.array(Schema);
export type CustomerArray = z.infer<typeof CustomerArraySchema>;

export const CreateCustomerSchema = Schema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  _tag: true,
});
export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;
