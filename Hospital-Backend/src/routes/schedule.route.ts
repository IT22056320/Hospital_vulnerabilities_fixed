// schedule.route.ts
import { Router } from "express";
import ScheduleController from "../controllers/schedule.controller";

class ScheduleRoute {
  public readonly router: Router;
  private readonly scheduleController: ScheduleController;

  constructor() {
    this.scheduleController = new ScheduleController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/:staffId/schedule", this.scheduleController.create.bind(this.scheduleController)); // Create schedule
    this.router.get("/:staffId/schedule", this.scheduleController.findByStaffId.bind(this.scheduleController)); // View schedule
    this.router.put("/:staffId/schedule", this.scheduleController.update.bind(this.scheduleController)); // Update schedule
    this.router.delete("/:staffId/schedule", this.scheduleController.delete.bind(this.scheduleController)); // Delete schedule
  }
}

export default new ScheduleRoute().router;
