import * as S from "effect/Schema";
import * as ServiceSchema from "@/schemas/service";
import * as RepairSchema from "@/schemas/repair";

export const Schema = S.Struct({
  ...ServiceSchema.Schema.fields,
  repair: S.Array(RepairSchema.Schema),
});

export type serviceWithRelations = S.Schema.Type<typeof Schema>;
export type serviceWithRelationsEncoded = S.Schema.Encoded<typeof Schema>;

export const SchemaArray = S.Array(Schema);
export type serviceWithRelationsArray = S.Schema.Type<typeof SchemaArray>;
export type serviceWithRelationsArrayEncoded = S.Schema.Encoded<
  typeof SchemaArray
>;
