// services/payment.service.ts
import Payment from '../models/payment.model';
import IPayment from '../interfaces/payment.interface';

class PaymentService {
  async create(paymentData: IPayment): Promise<IPayment> {
    const newPayment = new Payment(paymentData);
    // Simulate payment processing (e.g., validations, etc.)
    newPayment.status = 'completed'; // For simplicity, mark the payment as completed
    return newPayment.save();
  }

  async findAll(): Promise<IPayment[]> {
    return Payment.find();
  }

  async findById(id: string): Promise<IPayment | null> {
    return Payment.findById(id);
  }

  async delete(id: string): Promise<IPayment | null> {
    return Payment.findByIdAndDelete(id);
  }
}

export default PaymentService;
