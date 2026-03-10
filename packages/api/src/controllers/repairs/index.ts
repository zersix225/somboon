import { Hono } from "hono";
import type { RepairService } from "@/types/services/repair";
import * as RepairPostRoutes from "@/controllers/repairs/post";
import * as RepairGetRoutes from "@/controllers/repairs/get";
import * as RepairDeleteRoutes from "@/controllers/repairs/delete";
import * as RepairPatchRoutes from "@/controllers/repairs/patch";

export function setupRepairRoutes(repairService: RepairService) {
  return new Hono()
    .route("/", RepairPostRoutes.setupRepairPostRoutes(repairService))
    .route("/", RepairPatchRoutes.setupRepairPatchRoutes(repairService))
    .route("/", RepairGetRoutes.setupRepairGetRoutes(repairService))
    .route("/", RepairDeleteRoutes.setupRepairDeleteRoutes(repairService));
}
