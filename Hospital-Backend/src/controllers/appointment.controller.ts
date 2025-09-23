import { Request, Response } from 'express';
import mongoose from 'mongoose';
import IAppointment from '../interfaces/appointment.interface';
import AppointmentService from '../services/appointment.service';
import { InputSanitizer } from '../middlewares/inputValidation';

class AppointmentController {
  private readonly appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const appointmentData: IAppointment = req.body;
      const appointment = await this.appointmentService.create(appointmentData);
      res.status(201).json(appointment);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  // Find all appointments without filtering by doctor or appointment ID
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await this.appointmentService.findAll();
      res.status(200).json(appointments);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async findByDoctor(req: Request, res: Response): Promise<void> {
    try {
      // Validate and sanitize staffId parameter
      const sanitizedStaffId = InputSanitizer.sanitizeObjectId(req.params.staffId);
      if (!sanitizedStaffId) {
        res.status(400).json({ message: 'Invalid staff ID format' });
        return;
      }

      const staffId = new mongoose.Types.ObjectId(sanitizedStaffId); // Convert staffId to ObjectId
      const appointments = await this.appointmentService.findByDoctor(staffId);
      res.status(200).json(appointments);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      // Validate and sanitize appointment ID parameter
      const sanitizedId = InputSanitizer.sanitizeObjectId(req.params.id);
      if (!sanitizedId) {
        res.status(400).json({ message: 'Invalid appointment ID format' });
        return;
      }

      const appointment = await this.appointmentService.findById(sanitizedId);
      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
      } else {
        res.status(200).json(appointment);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      // Validate and sanitize appointment ID parameter
      const sanitizedId = InputSanitizer.sanitizeObjectId(req.params.id);
      if (!sanitizedId) {
        res.status(400).json({ message: 'Invalid appointment ID format' });
        return;
      }

      // Sanitize request body data
      const sanitizedData = this.sanitizeAppointmentData(req.body);
      
      const updatedAppointment = await this.appointmentService.update(sanitizedId, sanitizedData as IAppointment);
      if (!updatedAppointment) {
        res.status(404).json({ message: "Appointment not found" });
      } else {
        res.status(200).json(updatedAppointment);
      }
    } catch (error) {
      const err = error as Error; // Type-cast error to Error
      res.status(500).json({ message: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      // Validate and sanitize appointment ID parameter
      const sanitizedId = InputSanitizer.sanitizeObjectId(req.params.id);
      if (!sanitizedId) {
        res.status(400).json({ message: 'Invalid appointment ID format' });
        return;
      }

      const appointment = await this.appointmentService.delete(sanitizedId);
      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
      } else {
        res.status(200).json({ message: 'Appointment deleted successfully' });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  /**
   * Sanitize appointment data to prevent injection attacks
   */
  private sanitizeAppointmentData(data: any): Partial<IAppointment> {
    const sanitized: any = {};

    if (data.patientName && typeof data.patientName === 'string') {
      sanitized.patientName = InputSanitizer.sanitizeString(data.patientName);
    }

    if (data.staffId && typeof data.staffId === 'string') {
      const sanitizedStaffId = InputSanitizer.sanitizeObjectId(data.staffId);
      if (sanitizedStaffId) {
        sanitized.staffId = new mongoose.Types.ObjectId(sanitizedStaffId);
      }
    }

    if (data.date) {
      sanitized.date = data.date;
    }

    if (data.time && typeof data.time === 'string') {
      sanitized.time = InputSanitizer.sanitizeString(data.time);
    }

    if (data.reason && typeof data.reason === 'string') {
      sanitized.reason = InputSanitizer.sanitizeString(data.reason);
    }

    if (data.status && typeof data.status === 'string') {
      // Only allow valid status values
      const validStatuses = ['Active', 'Canceled', 'Completed'];
      if (validStatuses.includes(data.status)) {
        sanitized.status = data.status;
      }
    }

    return sanitized;
  }
}


export default AppointmentController;