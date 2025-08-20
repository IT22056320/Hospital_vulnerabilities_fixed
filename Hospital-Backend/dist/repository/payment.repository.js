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
// repository/payment.repository.ts
const payment_model_1 = __importDefault(require("../models/payment.model"));
class PaymentRepository {
    // Create a new payment record
    create(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPayment = new payment_model_1.default(paymentData);
            newPayment.status = 'completed'; // For simplicity, mark the payment as completed
            return newPayment.save();
        });
    }
    // Get all payment records
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return payment_model_1.default.find();
        });
    }
    // Get a single payment by ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return payment_model_1.default.findById(id);
        });
    }
    // Delete a payment by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return payment_model_1.default.findByIdAndDelete(id);
        });
    }
    // Optionally, update payment status or details (if required)
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return payment_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        });
    }
}
exports.default = PaymentRepository;
