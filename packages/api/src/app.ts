import "@/config/env";
import { Hono } from "hono";
import { prisma } from "@/config/prisma";
import { setupOpenApi } from "@/config/setup-openapi";
import { setupScalarDocs } from "@/config/setup-scalar";
import { setupUploadRoutes } from "@/controllers/upload";
import healthzApp from "@/controllers/healthz";
import { Error } from "@/middlewares";
import initCustomerRepository from "@/repositories/customers";
import initCustomerService from "@/services/customers";
import * as CustomerControllers from "@/controllers/customers";
import * as RepairControllers from "@/controllers/repair";
import { cors } from "hono/cors";
import initRepairRepository from "@/repositories/repair";
import initRepairService from "@/services/repair";

const app = new Hono();
setupOpenApi(app);

const customerRepository = initCustomerRepository(prisma);
const repairRepository = initRepairRepository(prisma);

const customerService = initCustomerService(customerRepository);
const repairService = initRepairService(repairRepository, customerRepository);

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
  .route("/uploads", setupUploadRoutes())
  .route("/customers", CustomerControllers.setupCustomerRoutes(customerService))
  .route("/repairs", RepairControllers.setupRepairRoutes(repairService));

export type AppType = typeof routes;
