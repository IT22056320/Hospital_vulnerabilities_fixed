// schedule.service.ts
import Staff from "../models/staff.model";

class ScheduleService {
  async createSchedule(staffId: string, scheduleData: string) {
    return Staff.findByIdAndUpdate(staffId, { schedule: scheduleData }, { new: true });
  }

  async getScheduleByStaffId(staffId: string) {
    return Staff.findById(staffId).select("schedule");
  }

  async updateSchedule(staffId: string, scheduleData: string) {
    return Staff.findByIdAndUpdate(staffId, { schedule: scheduleData }, { new: true });
  }

  async deleteSchedule(staffId: string) {
    return Staff.findByIdAndUpdate(staffId, { schedule: "" }, { new: true });
  }
}

export default ScheduleService;
