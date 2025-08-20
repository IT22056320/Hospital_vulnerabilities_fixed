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
const schedule_service_1 = __importDefault(require("../services/schedule.service"));
class ScheduleController {
    constructor() {
        this.scheduleService = new schedule_service_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffId = req.params.staffId;
                const scheduleData = req.body;
                const schedule = yield this.scheduleService.createSchedule(staffId, scheduleData);
                res.status(201).json(schedule);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        });
    }
    findByStaffId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffId = req.params.staffId;
                const schedule = yield this.scheduleService.getScheduleByStaffId(staffId);
                if (!schedule) {
                    res.status(404).json({ message: "No schedule found" });
                }
                else {
                    res.status(200).json(schedule);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffId = req.params.staffId;
                const updatedSchedule = yield this.scheduleService.updateSchedule(staffId, req.body);
                res.status(200).json(updatedSchedule);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffId = req.params.staffId;
                yield this.scheduleService.deleteSchedule(staffId);
                res.status(200).json({ message: "Schedule deleted" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        });
    }
}
exports.default = ScheduleController;
