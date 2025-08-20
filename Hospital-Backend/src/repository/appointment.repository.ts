import Appointment from '../models/appointment.model';
import IAppointment from '../interfaces/appointment.interface';
import mongoose from 'mongoose';

class AppointmentRepository {
  async create(appointmentData: IAppointment): Promise<IAppointment> {
    console.log(appointmentData);
    const newAppointment = new Appointment(appointmentData);
    console.log(newAppointment);
    return newAppointment.save();
  }

  // Find all appointments and populate staffId with staff details
  async findAll(): Promise<IAppointment[]> {
    return Appointment.find().populate('staffId');
  }

  async findByDoctor(staffId: mongoose.Types.ObjectId): Promise<IAppointment[]> {
    return Appointment.find({ staffId }).populate({
      path: 'staffId',
      match: { role: 'Doctor' }, // Ensure that the role is Doctor
      select: 'name email specialization',
    });
  }

  async findById(id: string): Promise<IAppointment | null> {
    return Appointment.findById(id).populate({
      path: 'staffId',
      match: { role: 'Doctor' }, // Ensure that the role is Doctor
      select: 'name email specialization',
    });
  }

  async delete(id: string): Promise<IAppointment | null> {
    return Appointment.findByIdAndDelete(id);
  }

  async update(id: string, updateData: Partial<IAppointment>): Promise<IAppointment | null> {
    return Appointment.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default AppointmentRepository;
