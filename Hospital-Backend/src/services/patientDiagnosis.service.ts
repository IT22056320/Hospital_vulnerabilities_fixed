import IPatientDiagnosis from "../interfaces/patientDiagnosis.interface";
import PatientDiagnosisRepository from "../repository/patientDiagnosis.repository";
import { UpdateQuery } from "mongoose";

class PatientDiagnosisService {
  private readonly patientDiagnosisRepository: PatientDiagnosisRepository;

  constructor() {
    this.patientDiagnosisRepository = new PatientDiagnosisRepository();
  }

  // Create a new diagnosis
  async create(data: IPatientDiagnosis): Promise<IPatientDiagnosis> {
    return this.patientDiagnosisRepository.create(data);
  }

  // Find all diagnoses for a given patient
  async findByPatientId(patientId: string): Promise<IPatientDiagnosis[]> {
    return this.patientDiagnosisRepository.findByPatientId(patientId);
  }

  // Find diagnosis by ID
  async findById(id: string): Promise<IPatientDiagnosis | null> {
    return this.patientDiagnosisRepository.findById(id);
  }

  // Update diagnosis by ID
  async update(
    id: string,
    data: Partial<IPatientDiagnosis>
  ): Promise<IPatientDiagnosis | null> {
    const updateData: UpdateQuery<IPatientDiagnosis> = { $set: data };
    return this.patientDiagnosisRepository.update(id, updateData);
  }

  // Delete diagnosis by ID
  async delete(id: string): Promise<IPatientDiagnosis | null> {
    return this.patientDiagnosisRepository.delete(id);
  }
}

export default PatientDiagnosisService;
