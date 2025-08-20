"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// schedule.route.ts
const express_1 = require("express");
const schedule_controller_1 = __importDefault(require("../controllers/schedule.controller"));
class ScheduleRoute {
    constructor() {
        this.scheduleController = new schedule_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/:staffId/schedule", this.scheduleController.create.bind(this.scheduleController)); // Create schedule
        this.router.get("/:staffId/schedule", this.scheduleController.findByStaffId.bind(this.scheduleController)); // View schedule
        this.router.put("/:staffId/schedule", this.scheduleController.update.bind(this.scheduleController)); // Update schedule
        this.router.delete("/:staffId/schedule", this.scheduleController.delete.bind(this.scheduleController)); // Delete schedule
    }
}
exports.default = new ScheduleRoute().router;
