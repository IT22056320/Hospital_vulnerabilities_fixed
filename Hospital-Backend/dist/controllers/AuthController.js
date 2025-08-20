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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const asyncHandler_1 = require("../helpers/asyncHandler");
class AuthController {
    constructor() {
        this.register = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role } = req.body;
            const newStaff = yield this.authService.register(username, email, password, role);
            if (newStaff) {
                res.status(201).json({ message: 'Staff registered successfully', staff: newStaff });
            }
            else {
                res.status(400).json({ message: 'Staff registration failed' });
            }
        }));
        this.login = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield this.authService.login(email, password);
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }));
        this.authService = new AuthService_1.AuthService();
    }
}
exports.AuthController = AuthController;
