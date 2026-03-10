import type { AppType } from "@/app";
import { hc } from "hono/client";

const client = hc<AppType>("");
export type Client = typeof client;

export const honoClient = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args);
