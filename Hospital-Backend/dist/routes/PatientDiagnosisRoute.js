"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientDiagnosis_controller_1 = __importDefault(require("../controllers/patientDiagnosis.controller"));
class PatientDiagnosisRoute {
    constructor() {
        this.patientDiagnosisController = new patientDiagnosis_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/:id", this.patientDiagnosisController.create.bind(this.patientDiagnosisController)); // Create
        this.router.get("/patient/:patientId", this.patientDiagnosisController.findByPatientId.bind(this.patientDiagnosisController)); // Get all by patientId
        this.router.get("/:id", this.patientDiagnosisController.findById.bind(this.patientDiagnosisController)); // Get by ID
        this.router.put("/:id", this.patientDiagnosisController.update.bind(this.patientDiagnosisController)); // Update
        this.router.delete("/:id", this.patientDiagnosisController.delete.bind(this.patientDiagnosisController)); // Delete
    }
}
exports.default = new PatientDiagnosisRoute().router;
