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
exports.AuthService = void 0;
// src/services/AuthService.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const staff_model_1 = __importDefault(require("../models/staff.model")); // Assuming Staff schema is used for staff members
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET';
    }
    register(username, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield staff_model_1.default.findOne({ email });
                if (existingUser) {
                    throw new Error('Staff member already exists');
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                yield User_1.default.create({
                    username,
                    email,
                    password: hashedPassword
                });
                const newStaff = new staff_model_1.default({
                    name: username,
                    email,
                    role, // Set the staff role during registration (e.g., doctor, nurse, admin)
                    password: hashedPassword
                });
                return yield newStaff.save();
            }
            catch (error) {
                console.error('Registration error:', error);
                return null;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({
                email,
            });
            if (user === null) {
                throw new Error('User not found');
            }
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new Error('Username & Password Incorrect');
            }
            const staff = yield staff_model_1.default.findOne({ email });
            if (staff === null) {
                throw new Error('Staff member not found for the user');
            }
            const token = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, user), { staffDetails: Object.assign({}, staff) }), this.jwtSecret, { expiresIn: '24h' });
            return { token, staffDetails: staff, user };
        });
    }
}
exports.AuthService = AuthService;
