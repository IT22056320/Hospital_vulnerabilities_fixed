import { Request, Response } from 'express';
import PaymentService from '../services/payment.service';

class PaymentController {
  private readonly paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  // Create a new payment
  async create(req: Request, res: Response) {
    try {
      const paymentData = req.body;
      const payment = await this.paymentService.create(paymentData);
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof Error) {
        // Now error is properly typed as an Error object
        res.status(500).json({ message: 'Payment failed', error: error.message });
      } else {
        res.status(500).json({ message: 'Payment failed', error: 'Unknown error' });
      }
    }
  }

  // Get all payments
  async findAll(req: Request, res: Response) {
    try {
      const payments = await this.paymentService.findAll();
      res.status(200).json(payments);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  // Get payment by ID
  async findById(req: Request, res: Response) {
    try {
      const payment = await this.paymentService.findById(req.params.id);
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
      } else {
        res.status(200).json(payment);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  // Delete a payment
  async delete(req: Request, res: Response) {
    try {
      const payment = await this.paymentService.delete(req.params.id);
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
      } else {
        res.status(200).json({ message: 'Payment deleted successfully' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }
}

export default PaymentController;
