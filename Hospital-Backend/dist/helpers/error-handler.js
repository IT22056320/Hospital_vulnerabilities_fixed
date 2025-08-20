"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static notFound(req, res, next) {
        res.status(404).json({ message: "Resource not found" });
    }
    static serverError(error, req, res, next) {
        res.status(500).json({ message: error.message });
    }
}
exports.default = ErrorHandler;
