import "@/config/env";
import { type Context, Hono } from "hono";
import { prisma } from "@/config/prisma";
import { setupOpenApi } from "@/config/setup-openapi";
import { setupScalarDocs } from "@/config/setup-scalar";
import healthzApp from "@/controllers/healthz";
import initCustomerRepository from "@/repositories/customers";
import initCustomerService from "@/services/customers";
import * as CustomerControllers from "@/controllers/customers";
import * as RepairControllers from "@/controllers/repairs";
import * as UploadImageControllers from "@/controllers/uploadImages";
import { cors } from "hono/cors";
import initRepairRepository from "@/repositories/repairs";
import initRepairService from "@/services/repairs";
import initUploadImageService from "@/services/uploadImage";
import { AppError } from "@/errors";
import { errorHandler } from "@/middlewares/error";

const app = new Hono();
setupOpenApi(app);

const customerRepository = initCustomerRepository(prisma);
const repairRepository = initRepairRepository(prisma);

const customerService = initCustomerService(customerRepository);
const repairService = initRepairService(repairRepository, customerRepository);

const uploadImageService = initUploadImageService();

app.onError(errorHandler);

export const routes = app

  .use(
    "*",
    cors({
      origin: [
        "https://somboonautoair.xyz",
        "https://www.somboonautoair.xyz",
        "http://localhost:5173",
      ],
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )

  .route("/docs", setupScalarDocs())
  .route("/healthz", healthzApp)
  .route(
    "/uploads",
    UploadImageControllers.setupUploadImageRoutes(uploadImageService),
  )
  .route("/customers", CustomerControllers.setupCustomerRoutes(customerService))
  .route("/repairs", RepairControllers.setupRepairRoutes(repairService));

export type AppType = typeof routes;
