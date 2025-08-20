"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    address: { type: String, required: true },
    occupation: { type: String, optional: true },
    emergencyContactName: { type: String, optional: true },
    emergencyContactNumber: { type: String, optional: true },
}, {
    timestamps: true,
});
const Profile = mongoose_1.default.model('Profile', profileSchema);
exports.default = Profile;
