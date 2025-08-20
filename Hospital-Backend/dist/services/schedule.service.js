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
// schedule.service.ts
const staff_model_1 = __importDefault(require("../models/staff.model"));
class ScheduleService {
    createSchedule(staffId, scheduleData) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findByIdAndUpdate(staffId, { schedule: scheduleData }, { new: true });
        });
    }
    getScheduleByStaffId(staffId) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findById(staffId).select("schedule");
        });
    }
    updateSchedule(staffId, scheduleData) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findByIdAndUpdate(staffId, { schedule: scheduleData }, { new: true });
        });
    }
    deleteSchedule(staffId) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findByIdAndUpdate(staffId, { schedule: "" }, { new: true });
        });
    }
}
exports.default = ScheduleService;
