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
const patientDiagnosis_repository_1 = __importDefault(require("../repository/patientDiagnosis.repository"));
class PatientDiagnosisService {
    constructor() {
        this.patientDiagnosisRepository = new patientDiagnosis_repository_1.default();
    }
    // Create a new diagnosis
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.patientDiagnosisRepository.create(data);
        });
    }
    // Find all diagnoses for a given patient
    findByPatientId(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.patientDiagnosisRepository.findByPatientId(patientId);
        });
    }
    // Find diagnosis by ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.patientDiagnosisRepository.findById(id);
        });
    }
    // Update diagnosis by ID
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = { $set: data };
            return this.patientDiagnosisRepository.update(id, updateData);
        });
    }
    // Delete diagnosis by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.patientDiagnosisRepository.delete(id);
        });
    }
}
exports.default = PatientDiagnosisService;
