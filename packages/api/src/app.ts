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
import { cors } from "hono/cors";

const app = new Hono();
setupOpenApi(app);

const customerRepository = initCustomerRepository(prisma);
const customerService = initCustomerService(customerRepository);

export const routes = app

  .use(
    "*",
    cors({
      origin: "http://localhost:5173",
      allowMethods: ["GET", "POST", "PUT", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .onError((err, c) => {
    return Error.errorHandler(err, c);
  })

  .route("/docs", setupScalarDocs())
  .route("/healthz", healthzApp)
  .route(
    "/customers",
    CustomerControllers.setupCustomerRoutes(customerService),
  );

export type AppType = typeof routes;
