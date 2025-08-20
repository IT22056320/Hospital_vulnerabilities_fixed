import mongoose from "mongoose";

interface ISchedule extends mongoose.Document {
  staffId: mongoose.Schema.Types.ObjectId; // Reference to Staff
  day: string;  // e.g., "Monday", "Tuesday"
  startTime: string; // e.g., "09:00 AM"
  endTime: string;   // e.g., "05:00 PM"
  notes?: string; // Optional field for additional notes on the schedule
}

const scheduleSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  notes: { type: String }, // Optional field
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
});

const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
export default Schedule;
