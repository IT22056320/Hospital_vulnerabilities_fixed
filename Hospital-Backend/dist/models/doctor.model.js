"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const doctorSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    workExperience: { type: String, required: true },
    about: { type: String, required: true },
    degree: { type: String, required: true },
    specialization: { type: String, required: true },
});
const Doctor = mongoose_1.default.model('Doctor', doctorSchema); // Register the model
exports.default = Doctor;
