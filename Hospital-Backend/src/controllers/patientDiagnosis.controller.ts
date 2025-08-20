import { Request, Response } from "express";
import PatientDiagnosisService from "../services/patientDiagnosis.service";
import IPatientDiagnosis from "../interfaces/patientDiagnosis.interface";

class PatientDiagnosisController {
  private readonly patientDiagnosisService: PatientDiagnosisService;

  constructor() {
    this.patientDiagnosisService = new PatientDiagnosisService();
  }

  // Create a new diagnosis
  async create(req: Request, res: Response) {
    try {
      const diagnosisData: IPatientDiagnosis = req.body;
      diagnosisData.patientId = req.params.id;
      const diagnosis = await this.patientDiagnosisService.create(
        diagnosisData
      );
      res.status(201).json(diagnosis);
    } catch (error) {
      const err = error as Error;
      res
        .status(500)
        .json({ message: "Error creating diagnosis: " + err.message });
    }
  }

  // Find all diagnoses by patient ID
  async findByPatientId(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const diagnoses = await this.patientDiagnosisService.findByPatientId(
        patientId
      );
      res.status(200).json(diagnoses);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  // Find a diagnosis by ID
  async findById(req: Request, res: Response) {
    try {
      const diagnosis = await this.patientDiagnosisService.findById(
        req.params.id
      );
      if (!diagnosis) {
        res.status(404).json({ message: "Diagnosis not found" });
      } else {
        res.status(200).json(diagnosis);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  // Update a diagnosis
  async update(req: Request, res: Response) {
    try {
      const diagnosis = await this.patientDiagnosisService.update(
        req.params.id,
        req.body
      );
      if (!diagnosis) {
        res.status(404).json({ message: "Diagnosis not found" });
      } else {
        res.status(200).json(diagnosis);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a diagnosis
  async delete(req: Request, res: Response) {
    try {
      const diagnosis = await this.patientDiagnosisService.delete(
        req.params.id
      );
      if (!diagnosis) {
        res.status(404).json({ message: "Diagnosis not found" });
      } else {
        res.status(200).json({ message: "Diagnosis deleted successfully" });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }
}

export default PatientDiagnosisController;
