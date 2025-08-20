import IStaffDetails from "../interfaces/staffDetails.interface";
import StaffDetailsRepository from "../repository/staffDetails.repository";

class StaffDetailsService {
  private readonly staffDetailsRepository: StaffDetailsRepository;

  constructor() {
    this.staffDetailsRepository = new StaffDetailsRepository();
  }

  async create(details: IStaffDetails): Promise<IStaffDetails> {
    return this.staffDetailsRepository.create(details);
  }

  async findByStaffId(staffId: string): Promise<IStaffDetails | null> {
    return this.staffDetailsRepository.findByStaffId(staffId);
  }

  async updateByStaffId(staffId: string, update: Partial<IStaffDetails>): Promise<IStaffDetails | null> {
    return this.staffDetailsRepository.updateByStaffId(staffId, update);
  }

  async deleteByStaffId(staffId: string): Promise<IStaffDetails | null> {
    return this.staffDetailsRepository.deleteByStaffId(staffId);
  }
}

export default StaffDetailsService;
