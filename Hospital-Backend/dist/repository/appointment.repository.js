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
const appointment_model_1 = __importDefault(require("../models/appointment.model"));
class AppointmentRepository {
    create(appointmentData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(appointmentData);
            const newAppointment = new appointment_model_1.default(appointmentData);
            console.log(newAppointment);
            return newAppointment.save();
        });
    }
    // Find all appointments and populate staffId with staff details
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return appointment_model_1.default.find().populate('staffId');
        });
    }
    findByDoctor(staffId) {
        return __awaiter(this, void 0, void 0, function* () {
            return appointment_model_1.default.find({ staffId }).populate({
                path: 'staffId',
                match: { role: 'Doctor' }, // Ensure that the role is Doctor
                select: 'name email specialization',
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return appointment_model_1.default.findById(id).populate({
                path: 'staffId',
                match: { role: 'Doctor' }, // Ensure that the role is Doctor
                select: 'name email specialization',
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return appointment_model_1.default.findByIdAndDelete(id);
        });
    }
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return appointment_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
        });
    }
}
exports.default = AppointmentRepository;
