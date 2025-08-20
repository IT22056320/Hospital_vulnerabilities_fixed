// models/payment.model.ts
import mongoose from 'mongoose';

interface IPayment extends mongoose.Document {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed'; // Payment status
}

const paymentSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  cardHolder: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, {
  timestamps: true,
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;
