import { Request, Response } from "express";
import StaffDetailsService from "../services/staffDetails.service";

class StaffDetailsController {
  private readonly staffDetailsService: StaffDetailsService;

  constructor() {
    this.staffDetailsService = new StaffDetailsService();
  }

  async create(req: Request, res: Response) {
    try {
      const staffId = req.params.staffId;
      const details = req.body;
      const staffDetails = await this.staffDetailsService.create({ staffId, ...details });
      res.status(201).json(staffDetails);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async findByStaffId(req: Request, res: Response) {
    try {
      const staffDetails = await this.staffDetailsService.findByStaffId(req.params.staffId);
      if (!staffDetails) {
        res.status(404).json({ message: "Details not found for this staff" });
      } else {
        res.status(200).json(staffDetails);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async updateByStaffId(req: Request, res: Response) {
    try {
      const updatedDetails = await this.staffDetailsService.updateByStaffId(req.params.staffId, req.body);
      if (!updatedDetails) {
        res.status(404).json({ message: "Details not found for this staff" });
      } else {
        res.status(200).json(updatedDetails);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async deleteByStaffId(req: Request, res: Response) {
    try {
      const deletedDetails = await this.staffDetailsService.deleteByStaffId(req.params.staffId);
      if (!deletedDetails) {
        res.status(404).json({ message: "Details not found for this staff" });
      } else {
        res.status(200).json({ message: "Details deleted successfully" });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }
}

export default StaffDetailsController;
