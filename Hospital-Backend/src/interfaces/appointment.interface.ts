import mongoose from 'mongoose';

// Define a minimal Staff interface to represent the populated staff details
interface IStaff {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  specialization?: string;
  role: string; // Should be "Doctor"
}

// Update IAppointment to allow staffId to be either ObjectId or populated IStaff object
interface IAppointment extends mongoose.Document {
  staffId: mongoose.Types.ObjectId | IStaff; // staffId can either be an ObjectId or populated IStaff object
  date: Date;
  time: string;
  reason: string;
  patientName: string;
  status: 'Active' | 'Canceled' | 'Completed';
}

export default IAppointment;
