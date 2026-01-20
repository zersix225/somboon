import { Hono } from "hono";
import type { CustomerService } from "@/types/services/customer";
import * as CustomerPostRoutes from "@/controllers/customers/post";

export function setupCustomerRoutes(customerService: CustomerService) {
  const app = new Hono();

  app.route("/", CustomerPostRoutes.setupCustomerPostRoutes(customerService));

  return app;
}
