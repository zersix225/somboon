import * as S from "effect/Schema";

export const Schema = S.Struct({
  name: S.String,
  size: S.Number,
  _tag: S.Literal("UploadImage").pipe(
    S.optional,
    S.withDefaults({
      constructor: () => "UploadImage" as const,
      decoding: () => "UploadImage" as const,
    }),
  ),
});

export type UploadImage = S.Schema.Type<typeof Schema>;

export const SchemaArray = S.Array(Schema);
export type UploadImageArray = S.Schema.Type<typeof SchemaArray>;
