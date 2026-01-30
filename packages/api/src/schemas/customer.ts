import * as S from "effect/Schema";
import * as Branded from "@/schemas/branded";
import * as GeneralSchema from "@/schemas/general";

export const Schema = S.Struct({
  id: Branded.CustomerId,
  first_name: S.String,
  last_name: S.String,
  phone: S.String,
  email: S.String,
  ...GeneralSchema.TimeStampSchema.fields,
  _tag: S.Literal("Customer").pipe(
    S.optional,
    S.withDefaults({
      constructor: () => "Customer" as const,
      decoding: () => "Customer" as const,
    }),
  ),
});

export type Customer = S.Schema.Type<typeof Schema>;
export type CustomerEncoded = S.Schema.Encoded<typeof Schema>;

export const SchemaArray = S.Array(Schema);
export type CustomerArray = S.Schema.Type<typeof SchemaArray>;
export type CustomerArrayEncoded = S.Schema.Encoded<typeof SchemaArray>;

export const CreateSchema = Schema.omit(
  "_tag",
  "id",
  "created_at",
  "updated_at",
);
export type CreateCustomer = S.Schema.Type<typeof CreateSchema>;

export const UpdateSchema = Schema.omit("_tag", "created_at", "updated_at");
export type UpdateCustomer = S.Schema.Type<typeof UpdateSchema>;
