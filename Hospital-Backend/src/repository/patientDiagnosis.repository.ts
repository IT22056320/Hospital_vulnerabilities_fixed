import { IPatientDiagnosis } from "../models/patientDiagnosis.model";
import PatientDiagnosis from "../models/patientDiagnosis.model";
import GenericRepository from "./generic.repository";
import mongoose, { UpdateQuery } from "mongoose";

class PatientDiagnosisRepository extends GenericRepository<IPatientDiagnosis> {
  constructor() {
    super(PatientDiagnosis);
  }

  // Find diagnoses by patient ID
  async findByPatientId(patientId: string): Promise<IPatientDiagnosis[]> {
    return PatientDiagnosis.find({ patientId }).exec(); // Added .exec() for better query handling
  }

  // Update diagnosis by ID
  async update(
    id: string,
    update: UpdateQuery<IPatientDiagnosis>
  ): Promise<IPatientDiagnosis | null> {
    return PatientDiagnosis.findByIdAndUpdate(id, update, { new: true });
  }

  // Delete diagnosis by ID
  async delete(id: string): Promise<IPatientDiagnosis | null> {
    return PatientDiagnosis.findByIdAndDelete(id);
  }
}

export default PatientDiagnosisRepository;
