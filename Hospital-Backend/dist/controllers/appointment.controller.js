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
const inputValidation_1 = require("../middlewares/inputValidation");
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
                // Validate and sanitize staffId parameter
                const sanitizedStaffId = inputValidation_1.InputSanitizer.sanitizeObjectId(req.params.staffId);
                if (!sanitizedStaffId) {
                    res.status(400).json({ message: 'Invalid staff ID format' });
                    return;
                }
                const staffId = new mongoose_1.default.Types.ObjectId(sanitizedStaffId); // Convert staffId to ObjectId
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
                // Validate and sanitize appointment ID parameter
                const sanitizedId = inputValidation_1.InputSanitizer.sanitizeObjectId(req.params.id);
                if (!sanitizedId) {
                    res.status(400).json({ message: 'Invalid appointment ID format' });
                    return;
                }
                const appointment = yield this.appointmentService.findById(sanitizedId);
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
                // Validate and sanitize appointment ID parameter
                const sanitizedId = inputValidation_1.InputSanitizer.sanitizeObjectId(req.params.id);
                if (!sanitizedId) {
                    res.status(400).json({ message: 'Invalid appointment ID format' });
                    return;
                }
                // Sanitize request body data
                const sanitizedData = this.sanitizeAppointmentData(req.body);
                const updatedAppointment = yield this.appointmentService.update(sanitizedId, sanitizedData);
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
                // Validate and sanitize appointment ID parameter
                const sanitizedId = inputValidation_1.InputSanitizer.sanitizeObjectId(req.params.id);
                if (!sanitizedId) {
                    res.status(400).json({ message: 'Invalid appointment ID format' });
                    return;
                }
                const appointment = yield this.appointmentService.delete(sanitizedId);
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
    /**
     * Sanitize appointment data to prevent injection attacks
     */
    sanitizeAppointmentData(data) {
        const sanitized = {};
        if (data.patientName && typeof data.patientName === 'string') {
            sanitized.patientName = inputValidation_1.InputSanitizer.sanitizeString(data.patientName);
        }
        if (data.staffId && typeof data.staffId === 'string') {
            const sanitizedStaffId = inputValidation_1.InputSanitizer.sanitizeObjectId(data.staffId);
            if (sanitizedStaffId) {
                sanitized.staffId = new mongoose_1.default.Types.ObjectId(sanitizedStaffId);
            }
        }
        if (data.date) {
            sanitized.date = data.date;
        }
        if (data.time && typeof data.time === 'string') {
            sanitized.time = inputValidation_1.InputSanitizer.sanitizeString(data.time);
        }
        if (data.reason && typeof data.reason === 'string') {
            sanitized.reason = inputValidation_1.InputSanitizer.sanitizeString(data.reason);
        }
        if (data.status && typeof data.status === 'string') {
            // Only allow valid status values
            const validStatuses = ['Active', 'Canceled', 'Completed'];
            if (validStatuses.includes(data.status)) {
                sanitized.status = data.status;
            }
        }
        return sanitized;
    }
}
exports.default = AppointmentController;
