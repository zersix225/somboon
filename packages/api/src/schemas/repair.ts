import * as S from "effect/Schema";
import * as Branded from "@/schemas/branded";
import * as GeneralSchema from "@/schemas/general";

export const Schema = S.Struct({
  id: Branded.RepairId,
  customer_id: Branded.CustomerId,
  service_id: Branded.ServiceId,
  moder_car: S.String.annotations({
    jsonSchema: {
      example: "civic",
      title: "moder_car",
      type: "string",
    },
  }),
  comment: S.String,
  date_repair: S.Union(S.Date, S.DateFromSelf).annotations({
    jsonSchema: {
      description: "Date or ISODate",
      example: "2026-01-01",
      tiele: "Date or ISODate",
      type: "string",
    },
  }),
  ...GeneralSchema.TimeStampSchema.fields,
  _tag: S.Literal("Repair").pipe(
    S.optional,
    S.withDefaults({
      constructor: () => "Repair" as const,
      decoding: () => "Repair" as const,
    }),
  ),
});

export type Repair = S.Schema.Type<typeof Schema>;
export type RepairEncoded = S.Schema.Encoded<typeof Schema>;

export const SchemaArray = S.Array(Schema);
export type RepairArray = S.Schema.Type<typeof SchemaArray>;
export type RepairArrayEncoded = S.Schema.Encoded<typeof SchemaArray>;

export const CreateSchema = Schema.omit(
  "_tag",
  "id",
  "created_at",
  "updated_at",
);
export type CreateRepair = S.Schema.Type<typeof CreateSchema>;

export const UpdateSchema = Schema.omit("_tag", "created_at", "updated_at");
export type UpdateRepair = S.Schema.Type<typeof UpdateSchema>;
