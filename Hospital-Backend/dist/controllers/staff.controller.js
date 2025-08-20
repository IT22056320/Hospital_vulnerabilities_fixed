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
const bcrypt_1 = __importDefault(require("bcrypt"));
const staff_service_1 = __importDefault(require("../services/staff.service"));
const User_1 = __importDefault(require("../models/User"));
class StaffController {
    constructor() {
        this.staffService = new staff_service_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use Partial<IStaff> to handle dynamic creation fields, including omitting _id
                const userData = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
                yield User_1.default.create({
                    username: userData.email,
                    email: userData.email,
                    password: hashedPassword
                });
                // Create the staff member
                const user = yield this.staffService.create(userData);
                res.status(201).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { role } = req.query;
                const users = role
                    ? yield this.staffService.findByRole(role)
                    : yield this.staffService.findAll();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.staffService.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: "Staff not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.staffService.update(req.params.id, req.body);
                if (!user) {
                    return res.status(404).json({ message: "Staff not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.staffService.delete(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: "Staff not found" });
                }
                res.status(200).json({ message: "Staff deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { staffId } = req.params;
                const { schedule } = req.body;
                const updatedStaff = yield this.staffService.updateSchedule(staffId, schedule);
                res.status(200).json(updatedStaff);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { staffId } = req.params;
                const staff = yield this.staffService.findById(staffId);
                if (!staff) {
                    return res.status(404).json({ message: 'Staff not found' });
                }
                res.status(200).json(staff.schedule);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = StaffController;
