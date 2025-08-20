import { IStaff } from "../models/staff.model";  // Import from Mongoose model
import StaffRepository from "../repository/staff.repository";
import { UpdateQuery } from "mongoose";

class StaffService {
  private readonly staffRepository: StaffRepository;

  constructor() {
    this.staffRepository = new StaffRepository();
  }

  async create(data: IStaff): Promise<IStaff> {
    return this.staffRepository.create(data);
  }

  async findAll(): Promise<IStaff[]> {
    return this.staffRepository.findAll();
  }

  async findByRole(role: string): Promise<IStaff[]> {
    return this.staffRepository.findAllPaginatedWithFilter({
      role
    }, 1, 1000);
  }

  async findById(id: string): Promise<IStaff | null> {
    return this.staffRepository.findById(id);
  }

  async update(id: string, data: Partial<IStaff>): Promise<IStaff | null> {
    const updateData: UpdateQuery<IStaff> = { $set: data };
    return this.staffRepository.update(id, updateData);
  }

  async delete(id: string): Promise<IStaff | null> {
    return this.staffRepository.delete(id);
  }

  async findByEmail(email: string): Promise<IStaff | null> {
    return this.staffRepository.findByEmail(email);
  }

  async findByName(name: string): Promise<IStaff | null> {
    return this.staffRepository.findByName(name);
  }

  // Update schedule method to handle optional schedule (recurring and custom)
  async updateSchedule(staffId: string, schedule: IStaff["schedule"]): Promise<IStaff | null> {
    return this.staffRepository.update(staffId, { schedule });
  }
}

export default StaffService;
