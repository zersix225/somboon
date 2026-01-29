import { honoClient } from "@repo/api/client";

const apiClient = honoClient(`http://localhost:${process.env.port}`);
export default apiClient;
