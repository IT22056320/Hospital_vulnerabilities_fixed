"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/payment.route.ts
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
class PaymentRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.paymentController = new payment_controller_1.default();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', this.paymentController.create.bind(this.paymentController)); // Create payment
        this.router.get('/', this.paymentController.findAll.bind(this.paymentController)); // Get all payments
        this.router.get('/:id', this.paymentController.findById.bind(this.paymentController)); // Get payment by ID
        this.router.delete('/:id', this.paymentController.delete.bind(this.paymentController)); // Delete payment
    }
}
exports.default = new PaymentRoute().router;
