import * as S from "effect/Schema";
import * as Branded from "@/schemas/branded";
import * as GeneralSchema from "@/schemas/general";

export const Schema = S.Struct({
  id: Branded.ServiceId,
  detail: S.String,
  price: S.Number,
  ...GeneralSchema.TimeStampSchema.fields,
  _tag: S.Literal("Service").pipe(
    S.optional,
    S.withDefaults({
      constructor: () => "Service" as const,
      decoding: () => "Service" as const,
    }),
  ),
});

export type Service = S.Schema.Type<typeof Schema>;
export type ServiceEncoded = S.Schema.Encoded<typeof Schema>;

export const SchemaArray = S.Array(Schema);
export type ServiceArray = S.Schema.Type<typeof SchemaArray>;
export type ServiceArrayEncoded = S.Schema.Encoded<typeof SchemaArray>;

export const CreateSchema = Schema.omit(
  "_tag",
  "id",
  "created_at",
  "updated_at",
);
export type ServiceRepair = S.Schema.Type<typeof CreateSchema>;

export const UpdateSchema = Schema.omit("_tag", "created_at", "updated_at");
export type UpdateService = S.Schema.Type<typeof UpdateSchema>;
