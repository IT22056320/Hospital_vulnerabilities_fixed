import mongoose from 'mongoose';

interface IAppointment extends mongoose.Document {
  staffId: mongoose.Types.ObjectId; // Reference to Staff model
  date: Date;
  time: string;
  reason: string;
  patientName: string;
  status: 'Active' | 'Canceled' | 'Completed'; // New status field to track appointment state
}

const appointmentSchema = new mongoose.Schema(
  {
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true }, // Reference to Staff model
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    patientName: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Canceled', 'Completed'], default: 'Active' }, // New field for status
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;