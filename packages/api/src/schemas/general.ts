import * as S from "effect/Schema";

export const TimeStampSchema = S.Struct({
  created_at: S.DateFromSelf.annotations({
    jsonSchema: {
      example: "2021-01-01T00:00:00.000Z",
      title: "createdAt",
      type: "string",
    },
  }),
  updated_at: S.DateFromSelf.annotations({
    jsonSchema: {
      example: "2021-01-01T00:00:00.000Z",
      title: "updatedAt",
      type: "string",
    },
  }),
});
