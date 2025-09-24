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
const express_1 = require("express");
const otplib_1 = require("otplib");
const qrcode_1 = __importDefault(require("qrcode"));
const User_1 = __importDefault(require("../models/User"));
const requireSession_1 = require("../middlewares/requireSession");
const router = (0, express_1.Router)();
// Initialize MFA setup - returns otpauth URL and a QR image data URL
router.post('/setup', requireSession_1.requireSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // @ts-ignore
        const email = (_b = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.userinfo) === null || _b === void 0 ? void 0 : _b.email;
        if (!email) {
            res.status(400).json({ message: 'Email not found in session' });
            return;
        }
        const secret = otplib_1.authenticator.generateSecret();
        const service = process.env.MFA_ISSUER || 'HospitalApp';
        const otpauth = otplib_1.authenticator.keyuri(email, service, secret);
        const qr = yield qrcode_1.default.toDataURL(otpauth);
        // Persist pending secret temporarily on user record
        yield User_1.default.updateOne({ email }, { $set: { twoFASecret: secret, twoFAEnabled: false } }, { upsert: false });
        res.json({ otpauth, qr });
        return;
    }
    catch (e) {
        res.status(500).json({ message: 'MFA setup failed', error: (e === null || e === void 0 ? void 0 : e.message) || String(e) });
    }
}));
// Verify MFA code to enable 2FA
router.post('/verify', requireSession_1.requireSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).json({ message: 'Missing token' });
            return;
        }
        // @ts-ignore
        const email = (_b = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.userinfo) === null || _b === void 0 ? void 0 : _b.email;
        if (!email) {
            res.status(400).json({ message: 'Email not found in session' });
            return;
        }
        const user = yield User_1.default.findOne({ email });
        if (!user || !user.twoFASecret) {
            res.status(400).json({ message: 'No pending 2FA setup' });
            return;
        }
        const valid = otplib_1.authenticator.verify({ token, secret: user.twoFASecret });
        if (!valid) {
            res.status(400).json({ message: 'Invalid token' });
            return;
        }
        user.twoFAEnabled = true;
        yield user.save();
        res.json({ message: '2FA enabled' });
        return;
    }
    catch (e) {
        res.status(500).json({ message: 'MFA verify failed', error: (e === null || e === void 0 ? void 0 : e.message) || String(e) });
    }
}));
// Disable 2FA
router.post('/disable', requireSession_1.requireSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // @ts-ignore
        const email = (_b = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.userinfo) === null || _b === void 0 ? void 0 : _b.email;
        if (!email) {
            res.status(400).json({ message: 'Email not found in session' });
            return;
        }
        yield User_1.default.updateOne({ email }, { $set: { twoFAEnabled: false, twoFASecret: null } });
        res.json({ message: '2FA disabled' });
        return;
    }
    catch (e) {
        res.status(500).json({ message: 'MFA disable failed', error: (e === null || e === void 0 ? void 0 : e.message) || String(e) });
    }
}));
exports.default = router;
