// models/insurance.model.ts
import mongoose from 'mongoose';

interface IInsurance extends mongoose.Document {
  insuranceId: string;
  policyNumber: string;
  provider: string;
  coverageAmount: number;
  premium: number;
  startDate: Date;
  endDate: Date;
}

const insuranceSchema = new mongoose.Schema({
  insuranceId: { type: String, required: true },
  policyNumber: { type: String, required: true },
  provider: { type: String, required: true },
  coverageAmount: { type: Number, required: true },
  premium: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, {
  timestamps: true,
});

const Insurance = mongoose.model<IInsurance>('Insurance', insuranceSchema);
export default Insurance;
