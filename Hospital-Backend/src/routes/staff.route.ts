import { Router, Request, Response } from "express";
import StaffController from "../controllers/staff.controller";

class StaffRoute {
  private readonly staffController: StaffController;
  public readonly router: Router;

  constructor() {
    this.staffController = new StaffController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/", async (req: Request, res: Response) => {
      try {
        await this.staffController.create(req, res); // Create
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    this.router.get("/", async (req: Request, res: Response) => {
      try {
        await this.staffController.findAll(req, res); // Get all
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    this.router.get("/:id", async (req: Request, res: Response) => {
      try {
        await this.staffController.findById(req, res); // Get by ID
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    this.router.put("/:id", async (req: Request, res: Response) => {
      try {
        await this.staffController.update(req, res); // Update
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    this.router.delete("/:id", async (req: Request, res: Response) => {
      try {
        await this.staffController.delete(req, res); // Delete
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    this.router.get("/:staffId/schedule", async (req: Request, res: Response) => {
      try {
        await this.staffController.getSchedule(req, res); // Get schedule
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    this.router.put("/:staffId/schedule", async (req: Request, res: Response) => {
      try {
        await this.staffController.updateSchedule(req, res); // Update schedule
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });
  }
}

export default new StaffRoute().router;
