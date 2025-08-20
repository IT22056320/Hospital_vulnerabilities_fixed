import { Router } from 'express';
import AppointmentController from '../controllers/appointment.controller';

class AppointmentRoute {
  private readonly appointmentController: AppointmentController;
  public readonly router: Router;

  constructor() {
    this.appointmentController = new AppointmentController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/', this.appointmentController.create.bind(this.appointmentController)); // Create appointment
    this.router.get('/doctor/:staffId', this.appointmentController.findByDoctor.bind(this.appointmentController)); // Get all appointments by doctor
    this.router.put('/:id', this.appointmentController.update.bind(this.appointmentController)); // Update appointment
    this.router.get('/:id', this.appointmentController.findById.bind(this.appointmentController)); // Get appointment by ID
    this.router.delete('/:id', this.appointmentController.delete.bind(this.appointmentController)); // Delete appointment
    this.router.get('/', this.appointmentController.findAll.bind(this.appointmentController)); // Get all appointments (new route)
    this.router.put('/:id', this.appointmentController.update.bind(this.appointmentController)); // Update appointment
  }
}

export default new AppointmentRoute().router;