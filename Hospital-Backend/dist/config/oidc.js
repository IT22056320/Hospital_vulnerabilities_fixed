"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCodeVerifier = generateCodeVerifier;
exports.generateCodeChallenge = generateCodeChallenge;
exports.getGoogleOAuthUrls = getGoogleOAuthUrls;
const crypto_1 = __importDefault(require("crypto"));
// Simple OAuth 2.0 PKCE utilities
function generateCodeVerifier() {
    return crypto_1.default.randomBytes(32).toString('base64url');
}
function generateCodeChallenge(verifier) {
    return crypto_1.default.createHash('sha256').update(verifier).digest('base64url');
}
function getGoogleOAuthUrls() {
    return {
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo'
    };
}
