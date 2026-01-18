import * as S from "effect/Schema";
import * as CustomerSchema from "@/schemas/customer";
import * as ServiceSchema from "@/schemas/service";
import * as RepairSchema from "@/schemas/repair";

export const Schema = S.Struct({
  ...RepairSchema.Schema.fields,
  customer: CustomerSchema.Schema,
  service: ServiceSchema.Schema,
});

export type repairWithRelations = S.Schema.Type<typeof Schema>;
export type repairWithRelationsEncoded = S.Schema.Encoded<typeof Schema>;

export const SchemaArray = S.Array(Schema);
export type repairWithRelationsArray = S.Schema.Type<typeof SchemaArray>;
export type repairWithRelationsArrayEncoded = S.Schema.Encoded<
  typeof SchemaArray
>;
