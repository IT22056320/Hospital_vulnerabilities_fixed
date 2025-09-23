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
const oidc_1 = require("../config/oidc");
const staff_model_1 = __importDefault(require("../models/staff.model"));
const router = (0, express_1.Router)();
// Begin OIDC login - redirect to provider authorization endpoint
router.get('/login/oidc', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client, codeChallenge, codeVerifier } = yield (0, oidc_1.getOidcClient)();
        // store verifier in session for later token exchange
        // @ts-ignore
        req.session.codeVerifier = codeVerifier;
        const url = client.authorizationUrl({
            scope: process.env.OIDC_SCOPE || 'openid profile email',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
        });
        res.redirect(url);
    }
    catch (e) {
        res.status(500).json({ message: 'OIDC login init failed', error: (e === null || e === void 0 ? void 0 : e.message) || String(e) });
    }
}));
// OIDC callback handler
router.get('/login/oidc/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client } = yield (0, oidc_1.getOidcClient)();
        const params = client.callbackParams(req);
        // @ts-ignore
        const codeVerifier = req.session.codeVerifier;
        if (!codeVerifier) {
            res.status(400).json({ message: 'Missing PKCE code verifier in session' });
            return;
        }
        const tokenSet = yield client.callback(process.env.OIDC_REDIRECT_URI, params, { code_verifier: codeVerifier });
        const userinfo = yield client.userinfo(tokenSet);
        // Attempt to load staff role by email for RBAC
        let staffDetails = null;
        try {
            const staff = yield staff_model_1.default.findOne({ email: userinfo.email });
            staffDetails = staff ? { _id: staff._id, name: staff.name, email: staff.email, role: staff.role } : null;
        }
        catch (_a) {
            staffDetails = null;
        }
        // Persist identity to session (server-side session; no JWT to client)
        // @ts-ignore
        req.session.user = { userinfo, staffDetails, role: staffDetails === null || staffDetails === void 0 ? void 0 : staffDetails.role, token: { id_token: tokenSet.id_token, access_token: tokenSet.access_token } };
        const frontend = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
        res.redirect(`${frontend}/`);
        return;
    }
    catch (e) {
        res.status(500).json({ message: 'OIDC callback failed', error: (e === null || e === void 0 ? void 0 : e.message) || String(e) });
    }
}));
// Get current user session data
router.get('/me', (req, res) => {
    var _a;
    // @ts-ignore
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        // @ts-ignore
        res.json(req.session.user);
        return;
    }
    res.status(401).json({ message: 'Not authenticated' });
});
// Logout clears session and optionally performs RP-initiated logout
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        // @ts-ignore
        const idToken = (_c = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.token) === null || _c === void 0 ? void 0 : _c.id_token;
        // @ts-ignore
        req.session.destroy(() => { });
        const postLogout = process.env.OIDC_POST_LOGOUT_REDIRECT_URI;
        if (idToken && postLogout) {
            try {
                const { client } = yield (0, oidc_1.getOidcClient)();
                const endSessionUrl = client.endSessionUrl({
                    id_token_hint: idToken,
                    post_logout_redirect_uri: postLogout,
                });
                res.json({ redirect: endSessionUrl });
                return;
            }
            catch (_d) {
                // fall through to simple response
            }
        }
        res.json({ message: 'Logged out' });
    }
    catch (e) {
        res.status(500).json({ message: 'Logout failed', error: (e === null || e === void 0 ? void 0 : e.message) || String(e) });
    }
}));
exports.default = router;
