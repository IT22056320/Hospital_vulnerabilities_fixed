// interfaces/insurance.interface.ts
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

export default IInsurance;
