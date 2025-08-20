import { Router } from "express";
import StaffDetailsController from "../controllers/staffDetails.controller";

class StaffDetailsRoute {
  private readonly staffDetailsController: StaffDetailsController;
  public readonly router: Router;

  constructor() {
    this.staffDetailsController = new StaffDetailsController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/:staffId", this.staffDetailsController.create.bind(this.staffDetailsController)); // Create
    this.router.get("/:staffId", this.staffDetailsController.findByStaffId.bind(this.staffDetailsController)); // Get by staff ID
    this.router.put("/:staffId", this.staffDetailsController.updateByStaffId.bind(this.staffDetailsController)); // Update by staff ID
    this.router.delete("/:staffId", this.staffDetailsController.deleteByStaffId.bind(this.staffDetailsController)); // Delete by staff ID
  }
}

export default new StaffDetailsRoute().router;
