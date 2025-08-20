"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/insurance.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const insuranceSchema = new mongoose_1.default.Schema({
    insuranceId: { type: String, required: true },
    policyNumber: { type: String, required: true },
    provider: { type: String, required: true },
    coverageAmount: { type: Number, required: true },
    premium: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
}, {
    timestamps: true,
});
const Insurance = mongoose_1.default.model('Insurance', insuranceSchema);
exports.default = Insurance;
