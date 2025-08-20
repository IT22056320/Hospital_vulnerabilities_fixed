import { Router } from "express";
import PatientDiagnosisController from "../controllers/patientDiagnosis.controller";

class PatientDiagnosisRoute {
  private readonly patientDiagnosisController: PatientDiagnosisController;
  public readonly router: Router;

  constructor() {
    this.patientDiagnosisController = new PatientDiagnosisController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/:id", this.patientDiagnosisController.create.bind(this.patientDiagnosisController)); // Create
    this.router.get("/patient/:patientId", this.patientDiagnosisController.findByPatientId.bind(this.patientDiagnosisController)); // Get all by patientId
    this.router.get("/:id", this.patientDiagnosisController.findById.bind(this.patientDiagnosisController)); // Get by ID
    this.router.put("/:id", this.patientDiagnosisController.update.bind(this.patientDiagnosisController)); // Update
    this.router.delete("/:id", this.patientDiagnosisController.delete.bind(this.patientDiagnosisController)); // Delete
  }
}

export default new PatientDiagnosisRoute().router;
