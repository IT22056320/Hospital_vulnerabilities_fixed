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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const oidc_1 = require("../config/oidc");
const staff_model_1 = __importDefault(require("../models/staff.model"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// Start OAuth login with PKCE
router.get('/oauth/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.OIDC_CLIENT_ID || !process.env.OIDC_REDIRECT_URI) {
            res.status(500).json({ message: 'OAuth not configured' });
            return;
        }
        const codeVerifier = (0, oidc_1.generateCodeVerifier)();
        const codeChallenge = (0, oidc_1.generateCodeChallenge)(codeVerifier);
        const { authUrl } = (0, oidc_1.getGoogleOAuthUrls)();
        // Store PKCE verifier in cookie
        res.cookie('pkce_verifier', codeVerifier, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 10 * 60 * 1000 // 10 minutes
        });
        const params = new URLSearchParams({
            client_id: process.env.OIDC_CLIENT_ID,
            redirect_uri: process.env.OIDC_REDIRECT_URI,
            response_type: 'code',
            scope: process.env.OIDC_SCOPE || 'openid profile email',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            state: crypto_1.default.randomBytes(16).toString('hex')
        });
        const redirectUrl = `${authUrl}?${params.toString()}`;
        res.redirect(redirectUrl);
    }
    catch (e) {
        res.status(500).json({ message: 'OAuth init failed', error: (e === null || e === void 0 ? void 0 : e.message) || String(e) });
    }
}));
// OAuth callback: exchange code, create local JWT, redirect frontend with token
router.get('/oauth/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { code } = req.query;
        const codeVerifier = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.pkce_verifier;
        if (!code || !codeVerifier) {
            res.status(400).json({ message: 'Missing authorization code or PKCE verifier' });
            return;
        }
        if (!process.env.OIDC_CLIENT_ID || !process.env.OIDC_REDIRECT_URI) {
            res.status(500).json({ message: 'OAuth not configured' });
            return;
        }
        const { tokenUrl, userInfoUrl } = (0, oidc_1.getGoogleOAuthUrls)();
        // Exchange code for access token
        const tokenResponse = yield axios_1.default.post(tokenUrl, new URLSearchParams({
            client_id: process.env.OIDC_CLIENT_ID,
            client_secret: process.env.OIDC_CLIENT_SECRET || '',
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.OIDC_REDIRECT_URI,
            code_verifier: codeVerifier
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        const { access_token } = tokenResponse.data;
        // Get user info
        const userResponse = yield axios_1.default.get(userInfoUrl, {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        const userInfo = userResponse.data;
        const email = userInfo.email;
        // Ensure local user/staff exists (upsert minimal records)
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            user = yield User_1.default.create({
                username: email,
                email,
                password: 'oauth-no-password'
            });
        }
        let staff = yield staff_model_1.default.findOne({ email });
        if (!staff) {
            staff = yield staff_model_1.default.create({
                name: userInfo.name || email,
                email,
                password: 'oauth-no-password',
                role: 'PATIENT'
            });
        }
        const jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET';
        const token = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, user.toObject()), { staffDetails: Object.assign({}, staff.toObject()) }), jwtSecret, { expiresIn: '24h' });
        const role = staff.role;
        const frontend = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
        // Clear PKCE cookie
        res.clearCookie('pkce_verifier');
        // Redirect with token, role, and user info in hash
        const frontendUserInfo = {
            username: user.username,
            email: user.email,
            role: staff.role
        };
        const redirect = `${frontend}/oauth/callback#token=${encodeURIComponent(token)}&role=${encodeURIComponent(role)}&user=${encodeURIComponent(JSON.stringify(frontendUserInfo))}`;
        res.redirect(redirect);
    }
    catch (e) {
        res.status(500).json({ message: 'OAuth callback failed', error: (e === null || e === void 0 ? void 0 : e.message) || String(e) });
    }
}));
exports.default = router;
