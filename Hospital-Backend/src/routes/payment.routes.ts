// routes/payment.route.ts
import { Router } from 'express';
import PaymentController from '../controllers/payment.controller';

class PaymentRoute {
  public readonly router: Router;
  private readonly paymentController: PaymentController;

  constructor() {
    this.router = Router();
    this.paymentController = new PaymentController();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/', this.paymentController.create.bind(this.paymentController)); // Create payment
    this.router.get('/', this.paymentController.findAll.bind(this.paymentController)); // Get all payments
    this.router.get('/:id', this.paymentController.findById.bind(this.paymentController)); // Get payment by ID
    this.router.delete('/:id', this.paymentController.delete.bind(this.paymentController)); // Delete payment
  }
}

export default new PaymentRoute().router;
