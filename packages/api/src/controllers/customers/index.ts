import { Hono } from "hono";
import type { CustomerService } from "@/types/services/customer";
import * as CustomerPostRoutes from "@/controllers/customers/post";
import * as CustomerGetRoutes from "@/controllers/customers/get";
import * as CustomerPutRoutes from "@/controllers/customers/put";
import * as CustomerDeleteRoutes from "@/controllers/customers/delete";
import * as CustomerPatchRoutes from "@/controllers/customers/patch";

export function setupCustomerRoutes(customerService: CustomerService) {
  return new Hono()
    .route("/", CustomerPostRoutes.setupCustomerPostRoutes(customerService))
    .route("/", CustomerGetRoutes.setupCustomerGetRoutes(customerService))
    .route("/", CustomerPutRoutes.setupCustomerPutRoutes(customerService))
    .route("/", CustomerPatchRoutes.setupCustomerPatchRoutes(customerService))
    .route(
      "/",
      CustomerDeleteRoutes.setupCustomerDeleteRoutes(customerService),
    );
}
