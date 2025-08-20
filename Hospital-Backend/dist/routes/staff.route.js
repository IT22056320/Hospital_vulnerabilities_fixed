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
const express_1 = require("express");
const staff_controller_1 = __importDefault(require("../controllers/staff.controller"));
class StaffRoute {
    constructor() {
        this.staffController = new staff_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.staffController.create(req, res); // Create
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        }));
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.staffController.findAll(req, res); // Get all
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        }));
        this.router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.staffController.findById(req, res); // Get by ID
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        }));
        this.router.put("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.staffController.update(req, res); // Update
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        }));
        this.router.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.staffController.delete(req, res); // Delete
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        }));
        this.router.get("/:staffId/schedule", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.staffController.getSchedule(req, res); // Get schedule
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        }));
        this.router.put("/:staffId/schedule", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.staffController.updateSchedule(req, res); // Update schedule
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        }));
    }
}
exports.default = new StaffRoute().router;
