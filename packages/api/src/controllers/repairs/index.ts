import { Hono } from "hono";
import type { RepairService } from "@/types/services/repair";
import * as RepairPostRoutes from "@/controllers/repairs/post";
import * as RepairGetRoutes from "@/controllers/repairs/get";

export function setupRepairRoutes(repairService: RepairService) {
  return new Hono()
    .route("/", RepairPostRoutes.setupRepairPostRoutes(repairService))
    .route("/", RepairGetRoutes.setupRepairGetRoutes(repairService));
}
