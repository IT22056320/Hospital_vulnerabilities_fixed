// interfaces/payment.interface.ts
import mongoose from 'mongoose';

interface IPayment extends mongoose.Document {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed'; // Payment status
  createdAt?: Date;  // Timestamp when the payment was created
  updatedAt?: Date;  // Timestamp when the payment was last updated
}

export default IPayment;
