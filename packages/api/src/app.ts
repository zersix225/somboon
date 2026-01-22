import "@/configure/env";
import { Hono } from "hono";
import { prisma } from "@/configure/prisma";
import { setupOpenApi } from "@/configure/setup-openapi";
import { setupScalarDocs } from "@/configure/setup-scalar";
import healthzApp from "@/controllers/healthz";

import initCustomerRepository from "@/repositories/customers";
import initCustomerService from "@/services/customers";
import * as CustomerControllers from "@/controllers/customers";

export const app = new Hono();
setupOpenApi(app);

app.route("/docs", setupScalarDocs());
app.route("/healthz", healthzApp);

const customerRepository = initCustomerRepository(prisma);
const customerService = initCustomerService(customerRepository);

app.route(
  "/customers",
  CustomerControllers.setupCustomerRoutes(customerService),
);

app.get("/", (c) => c.text("Hello Hono!"));

export type App = typeof app;
