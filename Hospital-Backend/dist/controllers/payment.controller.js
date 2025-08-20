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
const payment_service_1 = __importDefault(require("../services/payment.service"));
class PaymentController {
    constructor() {
        this.paymentService = new payment_service_1.default();
    }
    // Create a new payment
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentData = req.body;
                const payment = yield this.paymentService.create(paymentData);
                res.status(201).json(payment);
            }
            catch (error) {
                if (error instanceof Error) {
                    // Now error is properly typed as an Error object
                    res.status(500).json({ message: 'Payment failed', error: error.message });
                }
                else {
                    res.status(500).json({ message: 'Payment failed', error: 'Unknown error' });
                }
            }
        });
    }
    // Get all payments
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield this.paymentService.findAll();
                res.status(200).json(payments);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Unknown error occurred' });
                }
            }
        });
    }
    // Get payment by ID
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield this.paymentService.findById(req.params.id);
                if (!payment) {
                    res.status(404).json({ message: 'Payment not found' });
                }
                else {
                    res.status(200).json(payment);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Unknown error occurred' });
                }
            }
        });
    }
    // Delete a payment
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield this.paymentService.delete(req.params.id);
                if (!payment) {
                    res.status(404).json({ message: 'Payment not found' });
                }
                else {
                    res.status(200).json({ message: 'Payment deleted successfully' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Unknown error occurred' });
                }
            }
        });
    }
}
exports.default = PaymentController;
