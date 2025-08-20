import mongoose, { Document} from "mongoose";

// Define the IDrug interface
interface IDrug {
  drugName: string;
  dosage: string;
  frequency: string;
  
}
// Define the IPatientDiagnosis interface
export interface IPatientDiagnosis extends Document {
  patientId: string;
  prescriptionId: string;
  prescriptionDate: Date;
  symptoms: string;
  diagnosis: string;
  drugs: IDrug[]; // Array of drugs
  duration: string;
  additionalNotes: string;
}

// Define the schema for patient diagnosis
const drugSchema = new mongoose.Schema({
  drugName: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
});

// Define the schema for patient diagnosis
const patientDiagnosisSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

// Export the model
const PatientDiagnosis = mongoose.model<IPatientDiagnosis>('PatientDiagnosis', patientDiagnosisSchema);
export default PatientDiagnosis;
