"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const timeSlotSchema = new mongoose_1.default.Schema({
    time: {
        type: String, // Example: '09:00 AM - 10:00 AM'
        required: true
    },
    available: {
        type: Boolean, // true if available, false if unavailable
        default: false
    }
});
const scheduleSchema = new mongoose_1.default.Schema({
    Monday: [timeSlotSchema], // Array of time slots for Monday
    Tuesday: [timeSlotSchema], // Array of time slots for Tuesday
    Wednesday: [timeSlotSchema], // Array of time slots for Wednesday
    Thursday: [timeSlotSchema], // Array of time slots for Thursday
    Friday: [timeSlotSchema], // Array of time slots for Friday
    Saturday: [timeSlotSchema], // Array of time slots for Saturday
    Sunday: [timeSlotSchema] // Array of time slots for Sunday
});
// Define the schema
const staffSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }, // doctor, nurse, admin, etc.
    contactInformation: { type: String, required: false }, // Optional contact info
    department: { type: String, required: false }, // Optional department
    schedule: scheduleSchema,
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});
// Export the model and the interface
const Staff = mongoose_1.default.model('Staff', staffSchema);
exports.default = Staff;
