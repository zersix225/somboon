import { hc } from "hono/client";
import type { App } from "./app";

export const honoClient = (apiUrl: string) => hc<App>(apiUrl);
