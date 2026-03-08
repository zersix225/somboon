import * as S from "effect/Schema";
import * as CustomerSchema from "@/schemas/customer";
import * as ServiceSchema from "@/schemas/service";
import * as RepairSchema from "@/schemas/repair";
import { CreateServiceSchema } from "@/schemas/service";

export const Schema = S.Struct({
  ...RepairSchema.Schema.fields,
  service: S.Array(ServiceSchema.Schema),
  customer: CustomerSchema.Schema,
});

export type RepairWithRelations = S.Schema.Type<typeof Schema>;
export type RepairWithRelationsEncoded = S.Schema.Encoded<typeof Schema>;

export const CreateRepairWithRelationsSchema = S.Struct({
  ...RepairSchema.Schema.omit("_tag", "id", "created_at", "updated_at").fields,
  service: S.Array(CreateServiceSchema),
});
export type CreateRepairWithRelations = S.Schema.Type<
  typeof CreateRepairWithRelationsSchema
>;

export const RepairWithRelationsSchemaArray = S.Array(
  S.Struct({
    ...RepairSchema.Schema.fields,
    service: S.Array(ServiceSchema.Schema),
    customer: CustomerSchema.Schema,
  }),
);
export type RepairWithRelationsArray = S.Schema.Type<
  typeof RepairWithRelationsSchemaArray
>;
export type RepairWithRelationsArrayEncoded = S.Schema.Encoded<
  typeof RepairWithRelationsSchemaArray
>;

export const PaginationSchema = S.Struct({
  items: S.Array(Schema),
  totalCount: S.Number,
  totalPages: S.Number,
  _links: S.Struct({
    self: S.String,
    next: S.Union(S.String, S.Null),
    prev: S.Union(S.String, S.Null),
  }),
});
export type PaginationRepair = S.Schema.Type<typeof PaginationSchema>;
