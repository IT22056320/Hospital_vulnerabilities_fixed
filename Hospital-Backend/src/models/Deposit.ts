import { Schema, model } from 'mongoose';

const DepositSchema = new Schema({
  amount: { type: Number, required: true },
  reference: { type: String, required: true },
  appointmentId: { type: String, required: true },
  proofPath: { type: String, required: true },
});

const Deposit = model('Deposit', DepositSchema);

export default Deposit;
