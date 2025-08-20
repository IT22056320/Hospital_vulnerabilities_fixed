"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = __importDefault(require("../controllers/appointment.controller"));
class AppointmentRoute {
    constructor() {
        this.appointmentController = new appointment_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', this.appointmentController.create.bind(this.appointmentController)); // Create appointment
        this.router.get('/doctor/:staffId', this.appointmentController.findByDoctor.bind(this.appointmentController)); // Get all appointments by doctor
        this.router.put('/:id', this.appointmentController.update.bind(this.appointmentController)); // Update appointment
        this.router.get('/:id', this.appointmentController.findById.bind(this.appointmentController)); // Get appointment by ID
        this.router.delete('/:id', this.appointmentController.delete.bind(this.appointmentController)); // Delete appointment
        this.router.get('/', this.appointmentController.findAll.bind(this.appointmentController)); // Get all appointments (new route)
        this.router.put('/:id', this.appointmentController.update.bind(this.appointmentController)); // Update appointment
    }
}
exports.default = new AppointmentRoute().router;
