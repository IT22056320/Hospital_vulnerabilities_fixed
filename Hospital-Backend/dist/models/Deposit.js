"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DepositSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    reference: { type: String, required: true },
    appointmentId: { type: String, required: true },
    proofPath: { type: String, required: true },
});
const Deposit = (0, mongoose_1.model)('Deposit', DepositSchema);
exports.default = Deposit;
