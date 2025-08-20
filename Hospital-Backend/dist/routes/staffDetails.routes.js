"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffDetails_controller_1 = __importDefault(require("../controllers/staffDetails.controller"));
class StaffDetailsRoute {
    constructor() {
        this.staffDetailsController = new staffDetails_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/:staffId", this.staffDetailsController.create.bind(this.staffDetailsController)); // Create
        this.router.get("/:staffId", this.staffDetailsController.findByStaffId.bind(this.staffDetailsController)); // Get by staff ID
        this.router.put("/:staffId", this.staffDetailsController.updateByStaffId.bind(this.staffDetailsController)); // Update by staff ID
        this.router.delete("/:staffId", this.staffDetailsController.deleteByStaffId.bind(this.staffDetailsController)); // Delete by staff ID
    }
}
exports.default = new StaffDetailsRoute().router;
