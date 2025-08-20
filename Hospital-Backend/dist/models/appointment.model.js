"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appointmentSchema = new mongoose_1.default.Schema({
    staffId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Staff', required: true }, // Reference to Staff model
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    patientName: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Canceled', 'Completed'], default: 'Active' }, // New field for status
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});
const Appointment = mongoose_1.default.model('Appointment', appointmentSchema);
exports.default = Appointment;
