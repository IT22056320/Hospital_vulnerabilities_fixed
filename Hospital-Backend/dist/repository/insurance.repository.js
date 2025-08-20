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
// repository/insurance.repository.ts
const insurance_model_1 = __importDefault(require("../models/insurance.model"));
class InsuranceRepository {
    // Create a new insurance record
    create(insuranceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newInsurance = new insurance_model_1.default(insuranceData);
            return newInsurance.save();
        });
    }
    // Get all insurance records
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return insurance_model_1.default.find();
        });
    }
    // Get a specific insurance by ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return insurance_model_1.default.findById(id);
        });
    }
    // Delete an insurance by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return insurance_model_1.default.findByIdAndDelete(id);
        });
    }
    // Update an insurance by ID
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return insurance_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
        });
    }
}
exports.default = InsuranceRepository;
