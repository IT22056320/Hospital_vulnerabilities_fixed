"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const bankDeposit_controller_1 = __importDefault(require("../controllers/bankDeposit.controller"));
const router = (0, express_1.Router)();
const bankDepositController = new bankDeposit_controller_1.default();
const upload = (0, multer_1.default)({ dest: 'uploads/' }); // Set up file upload destination
router.post('/submit-bank-deposit', upload.single('depositProof'), (req, res) => {
    bankDepositController.submitBankDeposit(req, res);
});
exports.default = router;
