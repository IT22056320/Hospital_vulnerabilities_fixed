"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/payment.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    cardNumber: { type: String, required: true },
    cardHolder: { type: String, required: true },
    expirationDate: { type: String, required: true },
    cvv: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, {
    timestamps: true,
});
const Payment = mongoose_1.default.model('Payment', paymentSchema);
exports.default = Payment;
