import { honoClient } from "@repo/api/client";

const apiClient = honoClient(
  process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:3000`,
);
export default apiClient;
