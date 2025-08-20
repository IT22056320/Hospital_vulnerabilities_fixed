"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/AuthRoutes.ts
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../middlewares/validateRequest");
const router = (0, express_1.Router)();
const authController = new AuthController_1.AuthController();
router.post('/register', [
    (0, express_validator_1.body)('username').isString().withMessage('Username must be a string'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Please enter a valid email'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], validateRequest_1.validateRequest, // Middleware to check validation results
authController.register);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please enter a valid email'),
    (0, express_validator_1.body)('password').not().isEmpty().withMessage('Password is required'),
], validateRequest_1.validateRequest, // Middleware to check validation results
authController.login);
exports.default = router;
