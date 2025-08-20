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
const staffDetails_repository_1 = __importDefault(require("../repository/staffDetails.repository"));
class StaffDetailsService {
    constructor() {
        this.staffDetailsRepository = new staffDetails_repository_1.default();
    }
    create(details) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffDetailsRepository.create(details);
        });
    }
    findByStaffId(staffId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffDetailsRepository.findByStaffId(staffId);
        });
    }
    updateByStaffId(staffId, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffDetailsRepository.updateByStaffId(staffId, update);
        });
    }
    deleteByStaffId(staffId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.staffDetailsRepository.deleteByStaffId(staffId);
        });
    }
}
exports.default = StaffDetailsService;
