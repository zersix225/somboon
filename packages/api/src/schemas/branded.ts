import * as S from "effect/Schema";

export const CustomerId = S.Number.pipe(S.brand("CustomerId")).annotations({
  jsonSchema: { type: "number" },
});
export type CustomerId = S.Schema.Type<typeof CustomerId>;

export const CustomerIdFromString = S.transform(
  S.NumberFromString,
  CustomerId,
  {
    decode: (id) => CustomerId.make(id),
    encode: (id) => id,
  },
);

export const RepairId = S.Number.pipe(S.brand("RepairId")).annotations({
  jsonSchema: { type: "number" },
});
export type RepairId = S.Schema.Type<typeof RepairId>;

export const RepairIdFromString = S.transform(S.NumberFromString, RepairId, {
  decode: (id) => RepairId.make(id),
  encode: (id) => id,
});

export const ServiceId = S.Number.pipe(S.brand("ServiceId")).annotations({
  jsonSchema: { type: "number" },
});
export type ServiceId = S.Schema.Type<typeof ServiceId>;

export const ServiceIdFromString = S.transform(S.NumberFromString, RepairId, {
  decode: (id) => ServiceId.make(id),
  encode: (id) => id,
});
