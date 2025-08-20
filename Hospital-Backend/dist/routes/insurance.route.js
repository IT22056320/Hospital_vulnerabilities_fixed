"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/insurance.route.ts
const express_1 = require("express");
const insurance_controller_1 = __importDefault(require("../controllers/insurance.controller"));
const insuranceController = new insurance_controller_1.default();
const router = (0, express_1.Router)();
// Insurance Routes
router.post('/', insuranceController.create.bind(insuranceController));
router.get('/', insuranceController.findAll.bind(insuranceController));
router.get('/:id', insuranceController.findById.bind(insuranceController));
router.put('/:id', insuranceController.update.bind(insuranceController));
router.delete('/:id', insuranceController.delete.bind(insuranceController));
exports.default = router;
