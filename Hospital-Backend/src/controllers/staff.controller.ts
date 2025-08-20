import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { IStaff } from "../models/staff.model";  // Import from the Mongoose model
import { CustomSchedule } from "../interfaces/staff.interface";  // CustomSchedule can remain from interface
import StaffService from "../services/staff.service";
import User from "../models/User";

class StaffController {
  private readonly staffService: StaffService;

  constructor() {
    this.staffService = new StaffService();
  }

  async create(req: Request, res: Response) {
    try {
      // Use Partial<IStaff> to handle dynamic creation fields, including omitting _id
      const userData: Partial<IStaff> = req.body;
      const hashedPassword = await bcrypt.hash(userData.password as string, 10);

      await User.create({
        username: userData.email,
        email: userData.email,
        password: hashedPassword
      });

      // Create the staff member
      const user = await this.staffService.create(userData as IStaff);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { role } = req.query;
      const users = role 
        ? await this.staffService.findByRole(role as string) 
        : await this.staffService.findAll();
      
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const user = await this.staffService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Staff not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await this.staffService.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "Staff not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const user = await this.staffService.delete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Staff not found" });
      }
      res.status(200).json({ message: "Staff deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async updateSchedule(req: Request, res: Response) {
    try {
      const { staffId } = req.params;
      const { schedule } = req.body;
      const updatedStaff = await this.staffService.updateSchedule(staffId, schedule);
      res.status(200).json(updatedStaff);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getSchedule(req: Request, res: Response) {
    try {
      const { staffId } = req.params;
      const staff = await this.staffService.findById(staffId);
      if (!staff) {
        return res.status(404).json({ message: 'Staff not found' });
      }
      res.status(200).json(staff.schedule);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default StaffController;
