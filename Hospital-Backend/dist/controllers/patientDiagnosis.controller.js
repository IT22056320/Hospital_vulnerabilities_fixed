"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientDiagnosis_service_1 = __importDefault(require("../services/patientDiagnosis.service"));
class PatientDiagnosisController {
    constructor() {
        this.patientDiagnosisService = new patientDiagnosis_service_1.default();
    }
    // Create a new diagnosis
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diagnosisData = req.body;
                diagnosisData.patientId = req.params.id;
                const diagnosis = yield this.patientDiagnosisService.create(diagnosisData);
                res.status(201).json(diagnosis);
            }
            catch (error) {
                const err = error;
                res
                    .status(500)
                    .json({ message: "Error creating diagnosis: " + err.message });
            }
        });
    }
    // Find all diagnoses by patient ID
    findByPatientId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patientId } = req.params;
                const diagnoses = yield this.patientDiagnosisService.findByPatientId(patientId);
                res.status(200).json(diagnoses);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    // Find a diagnosis by ID
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diagnosis = yield this.patientDiagnosisService.findById(req.params.id);
                if (!diagnosis) {
                    res.status(404).json({ message: "Diagnosis not found" });
                }
                else {
                    res.status(200).json(diagnosis);
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    // Update a diagnosis
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diagnosis = yield this.patientDiagnosisService.update(req.params.id, req.body);
                if (!diagnosis) {
                    res.status(404).json({ message: "Diagnosis not found" });
                }
                else {
                    res.status(200).json(diagnosis);
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    // Delete a diagnosis
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diagnosis = yield this.patientDiagnosisService.delete(req.params.id);
                if (!diagnosis) {
                    res.status(404).json({ message: "Diagnosis not found" });
                }
                else {
                    res.status(200).json({ message: "Diagnosis deleted successfully" });
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = PatientDiagnosisController;
