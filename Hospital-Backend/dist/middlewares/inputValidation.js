"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExternalUrl = exports.handleValidationErrors = exports.validateAppointmentData = exports.validateStaffId = exports.validateAppointmentId = exports.InputSanitizer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_validator_1 = require("express-validator");
// Input sanitization utility
class InputSanitizer {
    /**
     * Sanitize MongoDB ObjectId to prevent NoSQL injection
     */
    static sanitizeObjectId(id) {
        if (!id || typeof id !== 'string') {
            return null;
        }
        // Remove any non-alphanumeric characters except hyphens
        const sanitized = id.replace(/[^a-fA-F0-9]/g, '');
        // Validate ObjectId format (24 characters hex)
        if (sanitized.length !== 24 || !mongoose_1.default.Types.ObjectId.isValid(sanitized)) {
            return null;
        }
        return sanitized;
    }
    /**
     * Sanitize general user input to prevent injection attacks
     */
    static sanitizeString(input) {
        if (!input || typeof input !== 'string') {
            return '';
        }
        // Remove potentially dangerous characters
        return input
            .replace(/[<>'";&${}()]/g, '') // Remove HTML/JS injection chars
            .replace(/\$where/gi, '') // Remove MongoDB $where operator
            .replace(/\$ne/gi, '') // Remove MongoDB $ne operator
            .replace(/\$or/gi, '') // Remove MongoDB $or operator
            .replace(/\$and/gi, '') // Remove MongoDB $and operator
            .replace(/\$regex/gi, '') // Remove MongoDB $regex operator
            .trim();
    }
    /**
     * Validate and sanitize URL to prevent SSRF attacks
     */
    static validateUrl(url, allowedHosts = ['localhost', '127.0.0.1']) {
        if (!url || typeof url !== 'string') {
            return null;
        }
        try {
            const parsedUrl = new URL(url);
            // Only allow HTTP/HTTPS protocols
            if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
                return null;
            }
            // Check if hostname is in allowlist
            const isAllowed = allowedHosts.some(host => parsedUrl.hostname === host ||
                parsedUrl.hostname.endsWith(`.${host}`));
            if (!isAllowed) {
                return null;
            }
            // Prevent access to internal/private IP ranges
            const ip = parsedUrl.hostname;
            const privateIpRegex = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.|169\.254\.|::1|localhost)$/;
            if (privateIpRegex.test(ip) && !allowedHosts.includes(ip)) {
                return null;
            }
            return parsedUrl.href;
        }
        catch (error) {
            return null;
        }
    }
}
exports.InputSanitizer = InputSanitizer;
// Validation middleware for appointment endpoints
exports.validateAppointmentId = [
    (0, express_validator_1.param)('id').custom((value) => {
        const sanitized = InputSanitizer.sanitizeObjectId(value);
        if (!sanitized) {
            throw new Error('Invalid appointment ID format');
        }
        return true;
    }),
];
exports.validateStaffId = [
    (0, express_validator_1.param)('staffId').custom((value) => {
        const sanitized = InputSanitizer.sanitizeObjectId(value);
        if (!sanitized) {
            throw new Error('Invalid staff ID format');
        }
        return true;
    }),
];
exports.validateAppointmentData = [
    (0, express_validator_1.body)('patientName')
        .isString()
        .isLength({ min: 1, max: 100 })
        .custom((value) => {
        return InputSanitizer.sanitizeString(value) === value;
    })
        .withMessage('Patient name contains invalid characters'),
    (0, express_validator_1.body)('staffId')
        .custom((value) => {
        const sanitized = InputSanitizer.sanitizeObjectId(value);
        if (!sanitized) {
            throw new Error('Invalid staff ID format');
        }
        return true;
    }),
    (0, express_validator_1.body)('date')
        .isISO8601()
        .withMessage('Invalid date format'),
    (0, express_validator_1.body)('time')
        .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('Invalid time format (HH:MM)'),
    (0, express_validator_1.body)('reason')
        .isString()
        .isLength({ min: 1, max: 500 })
        .custom((value) => {
        return InputSanitizer.sanitizeString(value) === value;
    })
        .withMessage('Reason contains invalid characters'),
    (0, express_validator_1.body)('status')
        .isIn(['Active', 'Canceled', 'Completed'])
        .withMessage('Invalid status. Must be Active, Canceled, or Completed'),
];
// Error handling middleware
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.type === 'field' ? error.path : 'unknown',
                message: error.msg
            }))
        });
        return;
    }
    // Sanitize parameters after validation
    if (req.params.id) {
        req.params.id = InputSanitizer.sanitizeObjectId(req.params.id) || '';
    }
    if (req.params.staffId) {
        req.params.staffId = InputSanitizer.sanitizeObjectId(req.params.staffId) || '';
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
// SSRF protection middleware for external requests
const validateExternalUrl = (allowedHosts = ['localhost', '127.0.0.1']) => {
    return (req, res, next) => {
        if (req.body.url) {
            const validatedUrl = InputSanitizer.validateUrl(req.body.url, allowedHosts);
            if (!validatedUrl) {
                res.status(400).json({
                    message: 'Invalid or unauthorized URL'
                });
                return;
            }
            req.body.url = validatedUrl;
        }
        next();
    };
};
exports.validateExternalUrl = validateExternalUrl;
