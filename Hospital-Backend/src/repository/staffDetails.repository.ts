import IStaffDetails from "../interfaces/staffDetails.interface";
import StaffDetails from "../models/staffDetails.model";
import mongoose from "mongoose";

class StaffDetailsRepository {
  async create(details: IStaffDetails): Promise<IStaffDetails> {
    const newDetails = new StaffDetails(details);
    return newDetails.save();
  }

  async findByStaffId(staffId: string): Promise<IStaffDetails | null> {
    return StaffDetails.findOne({ staffId });
  }

  async updateByStaffId(staffId: string, update: Partial<IStaffDetails>): Promise<IStaffDetails | null> {
    return StaffDetails.findOneAndUpdate({ staffId }, { $set: update }, { new: true, upsert: true });
  }

  async deleteByStaffId(staffId: string): Promise<IStaffDetails | null> {
    return StaffDetails.findOneAndDelete({ staffId });
  }
}

export default StaffDetailsRepository;
