import { Hono } from "hono";
import type { RepairService } from "@/types/services/repair";
import * as RepairPostRoutes from "@/controllers/repairs/post";

export function setupRepairRoutes(repairService: RepairService) {
  return new Hono().route(
    "/",
    RepairPostRoutes.setupRepairPostRoutes(repairService),
  );
}
