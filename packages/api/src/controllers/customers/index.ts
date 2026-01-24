import { Hono } from "hono";
import type { CustomerService } from "@/types/services/customer";
import * as CustomerPostRoutes from "@/controllers/customers/post";
import * as CustomerGetRoutes from "@/controllers/customers/get";
import * as CustomerPutRoutes from "@/controllers/customers/put";
import * as CustomerDeleteRoutes from "@/controllers/customers/delete";
import * as CustomerPatchRoutes from "@/controllers/customers/patch";

export function setupCustomerRoutes(customerService: CustomerService) {
  const app = new Hono();

  app.route("/", CustomerPostRoutes.setupCustomerPostRoutes(customerService));
  app.route("/", CustomerGetRoutes.setupCustomerGetRoutes(customerService));
  app.route("/", CustomerPutRoutes.setupCustomerPutRoutes(customerService));
  app.route("/", CustomerPatchRoutes.setupCustomerPatchRoutes(customerService));
  app.route(
    "/",
    CustomerDeleteRoutes.setupCustomerDeleteRoutes(customerService),
  );
  return app;
}
