import { IStaff } from "../models/staff.model";
import { CustomSchedule } from "../interfaces/staff.interface";  // Import the CustomSchedule interface
import Staff from "../models/staff.model";
import mongoose, { UpdateQuery } from "mongoose";
import GenericRepository from "./generic.repository";

class StaffRepository extends GenericRepository<IStaff> {
  constructor() {
    super(Staff);
  }

  async findAll(): Promise<IStaff[]> {
    return Staff.find();  // This will retrieve all staff members
  }

  // Find staff member by email
  async findByEmail(email: string): Promise<IStaff | null> {
    return Staff.findOne({ email });
  }

  // Find staff member by name
  async findByName(name: string): Promise<IStaff | null> {
    return Staff.findOne({ name });
  }

  // Find staff member by ID
  async findById(id: string): Promise<IStaff | null> {
    return Staff.findById(id);
  }

  // Update staff member by ID
  async update(id: string, update: UpdateQuery<IStaff>): Promise<IStaff | null> {
    return Staff.findByIdAndUpdate(id, update, { new: true });
  }

  // Delete staff member by ID
  async delete(id: string): Promise<IStaff | null> {
    return Staff.findByIdAndDelete(id);
  }

  // Add a custom schedule for a specific date
  async addCustomSchedule(id: string, customSchedule: CustomSchedule): Promise<IStaff | null> {
    return Staff.findByIdAndUpdate(
      id,
      { $push: { "schedule.custom": customSchedule } },  // Push to the custom schedule array
      { new: true }
    );
  }

  // Remove a custom schedule for a specific date
  async removeCustomSchedule(id: string, customScheduleDate: Date): Promise<IStaff | null> {
    return Staff.findByIdAndUpdate(
      id,
      { $pull: { "schedule.custom": { date: customScheduleDate } } },  // Pull by the specific date
      { new: true }
    );
  }
}

export default StaffRepository;
