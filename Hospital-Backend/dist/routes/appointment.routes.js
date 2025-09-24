"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = __importDefault(require("../controllers/appointment.controller"));
const inputValidation_1 = require("../middlewares/inputValidation");
class AppointmentRoute {
    constructor() {
        this.appointmentController = new appointment_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        // Create appointment with validation
        this.router.post('/', inputValidation_1.validateAppointmentData, inputValidation_1.handleValidationErrors, this.appointmentController.create.bind(this.appointmentController));
        // Get all appointments by doctor with staff ID validation
        this.router.get('/doctor/:staffId', inputValidation_1.validateStaffId, inputValidation_1.handleValidationErrors, this.appointmentController.findByDoctor.bind(this.appointmentController));
        // Update appointment with ID and data validation
        this.router.put('/:id', inputValidation_1.validateAppointmentId, inputValidation_1.validateAppointmentData, inputValidation_1.handleValidationErrors, this.appointmentController.update.bind(this.appointmentController));
        // Get appointment by ID with validation
        this.router.get('/:id', inputValidation_1.validateAppointmentId, inputValidation_1.handleValidationErrors, this.appointmentController.findById.bind(this.appointmentController));
        // Delete appointment with ID validation
        this.router.delete('/:id', inputValidation_1.validateAppointmentId, inputValidation_1.handleValidationErrors, this.appointmentController.delete.bind(this.appointmentController));
        // Get all appointments (no validation needed)
        this.router.get('/', this.appointmentController.findAll.bind(this.appointmentController));
    }
}
exports.default = new AppointmentRoute().router;
