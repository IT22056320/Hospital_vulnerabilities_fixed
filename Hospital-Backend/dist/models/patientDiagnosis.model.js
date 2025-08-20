"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for patient diagnosis
const drugSchema = new mongoose_1.default.Schema({
    drugName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
});
// Define the schema for patient diagnosis
const patientDiagnosisSchema = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    }, // Reference to the patient
    prescriptionId: {
        type: String,
        unique: true,
        required: true,
    }, // Automatically generated unique prescription ID
    prescriptionDate: {
        type: Date,
        required: true,
        default: Date.now,
    }, // Date the prescription is issued
    symptoms: { type: String, required: true },
    diagnosis: { type: String, required: true },
    drugs: [drugSchema], // Array of drugs
    duration: { type: String, required: true },
    additionalNotes: { type: String },
}, {
    timestamps: true,
});
// Export the model
const PatientDiagnosis = mongoose_1.default.model('PatientDiagnosis', patientDiagnosisSchema);
exports.default = PatientDiagnosis;
