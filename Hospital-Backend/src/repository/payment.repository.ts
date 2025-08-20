// repository/payment.repository.ts
import Payment from '../models/payment.model';
import IPayment from '../interfaces/payment.interface';
import mongoose from 'mongoose';

class PaymentRepository {
  // Create a new payment record
  async create(paymentData: IPayment): Promise<IPayment> {
    const newPayment = new Payment(paymentData);
    newPayment.status = 'completed'; // For simplicity, mark the payment as completed
    return newPayment.save();
  }

  // Get all payment records
  async findAll(): Promise<IPayment[]> {
    return Payment.find();
  }

  // Get a single payment by ID
  async findById(id: string): Promise<IPayment | null> {
    return Payment.findById(id);
  }

  // Delete a payment by ID
  async delete(id: string): Promise<IPayment | null> {
    return Payment.findByIdAndDelete(id);
  }

  // Optionally, update payment status or details (if required)
  async updateStatus(id: string, status: 'pending' | 'completed' | 'failed'): Promise<IPayment | null> {
    return Payment.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export default PaymentRepository;
