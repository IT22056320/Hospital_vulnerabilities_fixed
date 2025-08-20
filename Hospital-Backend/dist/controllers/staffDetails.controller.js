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
const staffDetails_service_1 = __importDefault(require("../services/staffDetails.service"));
class StaffDetailsController {
    constructor() {
        this.staffDetailsService = new staffDetails_service_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffId = req.params.staffId;
                const details = req.body;
                const staffDetails = yield this.staffDetailsService.create(Object.assign({ staffId }, details));
                res.status(201).json(staffDetails);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    findByStaffId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffDetails = yield this.staffDetailsService.findByStaffId(req.params.staffId);
                if (!staffDetails) {
                    res.status(404).json({ message: "Details not found for this staff" });
                }
                else {
                    res.status(200).json(staffDetails);
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    updateByStaffId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedDetails = yield this.staffDetailsService.updateByStaffId(req.params.staffId, req.body);
                if (!updatedDetails) {
                    res.status(404).json({ message: "Details not found for this staff" });
                }
                else {
                    res.status(200).json(updatedDetails);
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    deleteByStaffId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedDetails = yield this.staffDetailsService.deleteByStaffId(req.params.staffId);
                if (!deletedDetails) {
                    res.status(404).json({ message: "Details not found for this staff" });
                }
                else {
                    res.status(200).json({ message: "Details deleted successfully" });
                }
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = StaffDetailsController;
