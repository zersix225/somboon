import { serve } from "@hono/node-server";
import { routes } from "@repo/api";

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: routes.fetch,
  port,
});
