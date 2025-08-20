"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    // Check if Authorization header is present
    if (!authHeader) {
        res.status(401).json({ message: 'Access denied, no token provided' });
        return;
    }
    // Split the Bearer token and extract the token value
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied, invalid token format' });
        return;
    }
    try {
        // Verify the token and decode the payload
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'JWT_SECRET');
        req.user = decoded; // Attach the decoded token payload to the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        // Handle invalid or expired token
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
};
exports.verifyToken = verifyToken;
