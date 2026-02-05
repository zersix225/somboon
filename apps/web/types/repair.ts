import { z } from "zod";
import { ServiceType } from "@/types";

const Schema = z.object({
  id: z.number(),
  customer_id: z.number(),
  comment: z.string(),
  model_car: z.string(),
  date_repair: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  _tag: z.string(),
});

export const CreateRepairSchema = Schema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  _tag: true,
}).extend({
  service: z.array(ServiceType.CreateServiceSchema),
});
export type CreateRepair = z.infer<typeof CreateRepairSchema>;
