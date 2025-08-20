import mongoose, { Document, Schema } from 'mongoose';

export interface ITimeSlot {
  time: string;  // Time range (e.g., '09:00 AM - 10:00 AM')
  available: boolean;  // Availability status (true = available, false = unavailable)
}

export interface IWeeklySchedule {
  Monday: ITimeSlot[];
  Tuesday: ITimeSlot[];
  Wednesday: ITimeSlot[];
  Thursday: ITimeSlot[];
  Friday: ITimeSlot[];
  Saturday: ITimeSlot[];
  Sunday: ITimeSlot[];
}

// Define the IStaff interface including the schedule fields
export interface IStaff extends Document {
  name: string;
  email: string;
  password: string;
  role: string;  // doctor, nurse, admin, etc.
  contactInformation?: string;  // Optional contact info
  department?: string;  // Optional department
  schedule?: IWeeklySchedule
}

const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String,  // Example: '09:00 AM - 10:00 AM'
    required: true
  },
  available: {
    type: Boolean,  // true if available, false if unavailable
    default: false
  }
});

const scheduleSchema = new mongoose.Schema({
  Monday: [timeSlotSchema],  // Array of time slots for Monday
  Tuesday: [timeSlotSchema],  // Array of time slots for Tuesday
  Wednesday: [timeSlotSchema],  // Array of time slots for Wednesday
  Thursday: [timeSlotSchema],  // Array of time slots for Thursday
  Friday: [timeSlotSchema],  // Array of time slots for Friday
  Saturday: [timeSlotSchema],  // Array of time slots for Saturday
  Sunday: [timeSlotSchema]  // Array of time slots for Sunday
});


// Define the schema
const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },  // doctor, nurse, admin, etc.
  contactInformation: { type: String, required: false },  // Optional contact info
  department: { type: String, required: false },  // Optional department
  schedule: scheduleSchema,
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Export the model and the interface
const Staff = mongoose.model<IStaff>('Staff', staffSchema);
export default Staff;
