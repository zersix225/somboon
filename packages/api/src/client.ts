import type { AppType } from "@/app";
import { hc } from "hono/client";

export type ApiClient = ReturnType<typeof hc<AppType>>;

export const honoClient = (apiUrl: string): ApiClient => {
  return hc<AppType>(apiUrl);
};
