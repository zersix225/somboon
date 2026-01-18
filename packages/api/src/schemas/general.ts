import * as S from "effect/Schema";

export const TimeStampSchema = S.Struct({
  created_at: S.DateFromSelf.annotations({
    jsonSchema: {
      example: "2021-01-01T00:00:00.000Z",
      title: "created_at",
      type: "string",
    },
  }),
  updated_at: S.DateFromSelf.annotations({
    jsonSchema: {
      example: "2021-01-01T00:00:00.000Z",
      title: "updated_at",
      type: "string",
    },
  }),
});
