import { z } from "zod";

export const Schema = z.object({
  id: z.number(),
  detail: z.string(),
  repair_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  price: z.number(),
  _tag: z.string(),
});

export type ServiceSchema = z.infer<typeof Schema>;

export const CreateServiceSchema = Schema.omit({
  id: true,
  _tag: true,
  repair_id: true,
  created_at: true,
  updated_at: true,
});
export type CreateService = z.infer<typeof CreateServiceSchema>;
