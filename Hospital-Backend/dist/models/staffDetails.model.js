"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const staffDetailsSchema = new mongoose_1.default.Schema({
    staffId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Staff", required: true }, // Reference to the Staff collection
    workExperience: { type: String, required: true },
    about: { type: String, required: true },
    degree: { type: String, required: true },
    specialization: { type: String, required: true },
}, {
    timestamps: true,
});
const StaffDetails = mongoose_1.default.model("StaffDetails", staffDetailsSchema);
exports.default = StaffDetails;
