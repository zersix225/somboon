import * as S from "effect/Schema";
import * as RepairSchema from "@/schemas/repair";
import * as CustomerSchema from "@/schemas/customer";

export const Schema = S.Struct({
  ...CustomerSchema.Schema.fields,
  repair: S.Array(RepairSchema.Schema),
});

export type CustomerWithRelations = S.Schema.Type<typeof Schema>;
export type CustomerWithRelationsEncoded = S.Schema.Encoded<typeof Schema>;

export const SchemaArray = S.Array(Schema);
export type CustomerWithRelationsArray = S.Schema.Type<typeof SchemaArray>;
export type CustomerWithRelationsArrayEncoded = S.Schema.Encoded<
  typeof SchemaArray
>;
