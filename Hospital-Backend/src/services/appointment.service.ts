import IAppointment from '../interfaces/appointment.interface';
import AppointmentRepository from '../repository/appointment.repository';
import mongoose from 'mongoose';

class AppointmentService {
  private readonly appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  async create(data: IAppointment): Promise<IAppointment> {
    return this.appointmentRepository.create(data);
  }

  async findAll(): Promise<IAppointment[]> {
    return this.appointmentRepository.findAll();
  }

  async findByDoctor(staffId: mongoose.Types.ObjectId): Promise<IAppointment[]> {
    return this.appointmentRepository.findByDoctor(staffId);
  }

  async findById(id: string): Promise<IAppointment | null> {
    return this.appointmentRepository.findById(id);
  }

  async delete(id: string): Promise<IAppointment | null> {
    return this.appointmentRepository.delete(id);
  }
  async update(id: string, data: IAppointment): Promise<IAppointment | null> {
    return this.appointmentRepository.update(id, data);
  }
}

export default AppointmentService;
