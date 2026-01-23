import "@/config/env";
import { Hono } from "hono";
import { prisma } from "@/config/prisma";
import { setupOpenApi } from "@/config/setup-openapi";
import { setupScalarDocs } from "@/config/setup-scalar";
import healthzApp from "@/controllers/healthz";
import { Error } from "@/middlewares";

import initCustomerRepository from "@/repositories/customers";
import initCustomerService from "@/services/customers";
import * as CustomerControllers from "@/controllers/customers";

export const app = new Hono();
setupOpenApi(app);

app.onError((err, c) => {
  return Error.errorHandler(err, c);
});

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
