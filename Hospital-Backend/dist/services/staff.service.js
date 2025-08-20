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
const staff_repository_1 = __importDefault(require("../repository/staff.repository"));
class StaffService {
    constructor() {
        this.staffRepository = new staff_repository_1.default();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffRepository.create(data);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffRepository.findAll();
        });
    }
    findByRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffRepository.findAllPaginatedWithFilter({
                role
            }, 1, 1000);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffRepository.findById(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = { $set: data };
            return this.staffRepository.update(id, updateData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffRepository.delete(id);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffRepository.findByEmail(email);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffRepository.findByName(name);
        });
    }
    // Update schedule method to handle optional schedule (recurring and custom)
    updateSchedule(staffId, schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffRepository.update(staffId, { schedule });
        });
    }
}
exports.default = StaffService;
