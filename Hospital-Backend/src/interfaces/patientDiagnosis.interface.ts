import mongoose from "mongoose";

interface IDrug {
  drugName: string;
  dosage: string;
  frequency: string;
}

interface IPatientDiagnosis extends mongoose.Document {
  patientId: string; // Reference to the patient
  prescriptionId: string;
  prescriptionDate: Date; // Date the prescription is issued
  symptoms: string;
  diagnosis: string; // Brief description of the patient’s condition
  drugs: IDrug[]; // Array of drug details
  duration: string; // Length of time the medication should be taken (e.g., 7 days)
  additionalNotes: string; // Additional instructions for the patient (optional)
}

export default IPatientDiagnosis;
