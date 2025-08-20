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
const patientDiagnosis_model_1 = __importDefault(require("../models/patientDiagnosis.model"));
const generic_repository_1 = __importDefault(require("./generic.repository"));
class PatientDiagnosisRepository extends generic_repository_1.default {
    constructor() {
        super(patientDiagnosis_model_1.default);
    }
    // Find diagnoses by patient ID
    findByPatientId(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return patientDiagnosis_model_1.default.find({ patientId }).exec(); // Added .exec() for better query handling
        });
    }
    // Update diagnosis by ID
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return patientDiagnosis_model_1.default.findByIdAndUpdate(id, update, { new: true });
        });
    }
    // Delete diagnosis by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return patientDiagnosis_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = PatientDiagnosisRepository;
