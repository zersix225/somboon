import { serve } from "@hono/node-server"
import { routes } from "@repo/api"

serve({
    fetch: routes.fetch,
    port: 3000,
})

console.log("server started", 3000)