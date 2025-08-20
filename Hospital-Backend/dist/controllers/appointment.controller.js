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
const mongoose_1 = __importDefault(require("mongoose"));
const appointment_service_1 = __importDefault(require("../services/appointment.service"));
class AppointmentController {
    constructor() {
        this.appointmentService = new appointment_service_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointmentData = req.body;
                const appointment = yield this.appointmentService.create(appointmentData);
                res.status(201).json(appointment);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    // Find all appointments without filtering by doctor or appointment ID
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.appointmentService.findAll();
                res.status(200).json(appointments);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    findByDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffId = new mongoose_1.default.Types.ObjectId(req.params.staffId); // Convert staffId to ObjectId
                const appointments = yield this.appointmentService.findByDoctor(staffId);
                res.status(200).json(appointments);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield this.appointmentService.findById(req.params.id);
                if (!appointment) {
                    res.status(404).json({ message: 'Appointment not found' });
                }
                else {
                    res.status(200).json(appointment);
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedAppointment = yield this.appointmentService.update(req.params.id, req.body);
                if (!updatedAppointment) {
                    res.status(404).json({ message: "Appointment not found" });
                }
                else {
                    res.status(200).json(updatedAppointment);
                }
            }
            catch (error) {
                const err = error; // Type-cast error to Error
                res.status(500).json({ message: err.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield this.appointmentService.delete(req.params.id);
                if (!appointment) {
                    res.status(404).json({ message: 'Appointment not found' });
                }
                else {
                    res.status(200).json({ message: 'Appointment deleted successfully' });
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = AppointmentController;
