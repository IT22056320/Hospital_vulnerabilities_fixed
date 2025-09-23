import { Router } from 'express';
import AppointmentController from '../controllers/appointment.controller';
import { 
  validateAppointmentId, 
  validateStaffId, 
  validateAppointmentData, 
  handleValidationErrors 
} from '../middlewares/inputValidation';

class AppointmentRoute {
  private readonly appointmentController: AppointmentController;
  public readonly router: Router;

  constructor() {
    this.appointmentController = new AppointmentController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    // Create appointment with validation
    this.router.post('/', 
      validateAppointmentData, 
      handleValidationErrors, 
      this.appointmentController.create.bind(this.appointmentController)
    );
    
    // Get all appointments by doctor with staff ID validation
    this.router.get('/doctor/:staffId', 
      validateStaffId, 
      handleValidationErrors, 
      this.appointmentController.findByDoctor.bind(this.appointmentController)
    );
    
    // Update appointment with ID and data validation
    this.router.put('/:id', 
      validateAppointmentId, 
      validateAppointmentData, 
      handleValidationErrors, 
      this.appointmentController.update.bind(this.appointmentController)
    );
    
    // Get appointment by ID with validation
    this.router.get('/:id', 
      validateAppointmentId, 
      handleValidationErrors, 
      this.appointmentController.findById.bind(this.appointmentController)
    );
    
    // Delete appointment with ID validation
    this.router.delete('/:id', 
      validateAppointmentId, 
      handleValidationErrors, 
      this.appointmentController.delete.bind(this.appointmentController)
    );
    
    // Get all appointments (no validation needed)
    this.router.get('/', this.appointmentController.findAll.bind(this.appointmentController));
  }
}

export default new AppointmentRoute().router;