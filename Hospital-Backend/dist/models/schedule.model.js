"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const scheduleSchema = new mongoose_1.default.Schema({
    staffId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Staff", required: true },
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    notes: { type: String }, // Optional field
}, {
    timestamps: true, // Add createdAt and updatedAt timestamps
});
const Schedule = mongoose_1.default.model("Schedule", scheduleSchema);
exports.default = Schedule;
