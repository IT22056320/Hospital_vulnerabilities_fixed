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
const staff_model_1 = __importDefault(require("../models/staff.model"));
const generic_repository_1 = __importDefault(require("./generic.repository"));
class StaffRepository extends generic_repository_1.default {
    constructor() {
        super(staff_model_1.default);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.find(); // This will retrieve all staff members
        });
    }
    // Find staff member by email
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findOne({ email });
        });
    }
    // Find staff member by name
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findOne({ name });
        });
    }
    // Find staff member by ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findById(id);
        });
    }
    // Update staff member by ID
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findByIdAndUpdate(id, update, { new: true });
        });
    }
    // Delete staff member by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findByIdAndDelete(id);
        });
    }
    // Add a custom schedule for a specific date
    addCustomSchedule(id, customSchedule) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findByIdAndUpdate(id, { $push: { "schedule.custom": customSchedule } }, // Push to the custom schedule array
            { new: true });
        });
    }
    // Remove a custom schedule for a specific date
    removeCustomSchedule(id, customScheduleDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return staff_model_1.default.findByIdAndUpdate(id, { $pull: { "schedule.custom": { date: customScheduleDate } } }, // Pull by the specific date
            { new: true });
        });
    }
}
exports.default = StaffRepository;
