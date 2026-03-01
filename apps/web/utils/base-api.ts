import { honoClient } from "@repo/api/client";

const apiClient = honoClient(
  process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:${process.env.PORT}`,
);
export default apiClient;
