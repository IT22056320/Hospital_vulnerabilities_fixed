// schedule.controller.ts
import { Request, Response } from "express";
import ScheduleService from "../services/schedule.service";

class ScheduleController {
    private readonly scheduleService: ScheduleService;
  
    constructor() {
      this.scheduleService = new ScheduleService();
    }
  
    async create(req: Request, res: Response) {
      try {
        const staffId = req.params.staffId;
        const scheduleData = req.body;
        const schedule = await this.scheduleService.createSchedule(staffId, scheduleData);
        res.status(201).json(schedule);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  
    async findByStaffId(req: Request, res: Response) {
      try {
        const staffId = req.params.staffId;
        const schedule = await this.scheduleService.getScheduleByStaffId(staffId);
        if (!schedule) {
          res.status(404).json({ message: "No schedule found" });
        } else {
          res.status(200).json(schedule);
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  
    async update(req: Request, res: Response) {
      try {
        const staffId = req.params.staffId;
        const updatedSchedule = await this.scheduleService.updateSchedule(staffId, req.body);
        res.status(200).json(updatedSchedule);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  
    async delete(req: Request, res: Response) {
      try {
        const staffId = req.params.staffId;
        await this.scheduleService.deleteSchedule(staffId);
        res.status(200).json({ message: "Schedule deleted" });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  }
  
export default ScheduleController;
  
