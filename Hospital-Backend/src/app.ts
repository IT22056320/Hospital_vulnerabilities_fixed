import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ErrorHandler from './helpers/error-handler';
import Database from './config/db';
import dotenv from 'dotenv';
import AuthRoutes from './routes/AuthRoutes';
import staffRoute from './routes/staff.route';
import staffDetailsRoutes from './routes/staffDetails.routes';
import appointmentRoutes from './routes/appointment.routes';
import bankDepositRoutes from './routes/bankDeposit.routes';
import paymentRoutes from './routes/payment.routes';
import scheduleRoutes from './routes/schedule.route';
import PatientDiagnosisRoute from './routes/PatientDiagnosisRoute';
import paymentRoute from './routes/payment.routes';
import insuranceRoute from './routes/insurance.route';
import profileRoutes from './routes/profile.routes';

class App {
  private readonly app: Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    this.init();
  }

  private init() {
    this.initConfig();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
  }

  private initConfig() {
    new Database();
  }

  private initMiddlewares() {
    // Secure CORS configuration
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173/').split(',');

    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('CORS policy: Not allowed by server'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('combined'));
    dotenv.config();
  }

  private initRoutes() {
    this.app.use('/api/v1/staff', staffRoute);
    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/staff-details', staffDetailsRoutes);
    this.app.use('/api/v1/appointments', appointmentRoutes);
    this.app.use('/api/v1/submit-bank-deposit', bankDepositRoutes);
    this.app.use('/api/v1/create-payment-intent', paymentRoutes);
    this.app.use('/api/v1/staff/:staffId/schedule', scheduleRoutes);
    this.app.use("/api/v1/patient-diagnosis", PatientDiagnosisRoute);
    this.app.use('/api/v1/payment', paymentRoute);
    this.app.use('/api/insurance', insuranceRoute);
    this.app.use("/api/v1/profile", profileRoutes);
  }

  private initErrorHandling() {
    this.app.use(ErrorHandler.notFound);
    this.app.use(ErrorHandler.serverError);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default App;
