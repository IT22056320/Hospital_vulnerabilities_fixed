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
const insurance_repository_1 = __importDefault(require("../repository/insurance.repository"));
class InsuranceController {
    constructor() {
        this.insuranceRepository = new insurance_repository_1.default();
    }
    // Create a new insurance
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insuranceData = req.body;
                const insurance = yield this.insuranceRepository.create(insuranceData);
                res.status(201).json(insurance);
            }
            catch (error) {
                if (error instanceof Error) {
                    // Now error is properly typed as an Error object
                    res.status(500).json({ message: 'Failed to create insurance', error: error.message });
                }
                else {
                    res.status(500).json({ message: 'Failed to create insurance', error: 'Unknown error' });
                }
            }
        });
    }
    // Get all insurances
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insurances = yield this.insuranceRepository.findAll();
                res.status(200).json(insurances);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: 'Failed to retrieve insurances', error: error.message });
                }
                else {
                    res.status(500).json({ message: 'Failed to retrieve insurances', error: 'Unknown error' });
                }
            }
        });
    }
    // Get insurance by ID
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insurance = yield this.insuranceRepository.findById(req.params.id);
                if (!insurance) {
                    res.status(404).json({ message: 'Insurance not found' });
                }
                else {
                    res.status(200).json(insurance);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: 'Failed to retrieve insurance', error: error.message });
                }
                else {
                    res.status(500).json({ message: 'Failed to retrieve insurance', error: 'Unknown error' });
                }
            }
        });
    }
    // Update insurance by ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insurance = yield this.insuranceRepository.update(req.params.id, req.body);
                if (!insurance) {
                    res.status(404).json({ message: 'Insurance not found' });
                }
                else {
                    res.status(200).json(insurance);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: 'Failed to update insurance', error: error.message });
                }
                else {
                    res.status(500).json({ message: 'Failed to update insurance', error: 'Unknown error' });
                }
            }
        });
    }
    // Delete insurance by ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insurance = yield this.insuranceRepository.delete(req.params.id);
                if (!insurance) {
                    res.status(404).json({ message: 'Insurance not found' });
                }
                else {
                    res.status(200).json({ message: 'Insurance deleted successfully' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: 'Failed to delete insurance', error: error.message });
                }
                else {
                    res.status(500).json({ message: 'Failed to delete insurance', error: 'Unknown error' });
                }
            }
        });
    }
}
exports.default = InsuranceController;
