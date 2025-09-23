import { Router } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import crypto from 'crypto';
import { generateCodeVerifier, generateCodeChallenge, getGoogleOAuthUrls } from '../config/oidc';
import Staff from '../models/staff.model';
import User from '../models/User';

const router = Router();

// Start OAuth login with PKCE
router.get('/oauth/login', async (req, res) => {
  try {
    if (!process.env.OIDC_CLIENT_ID || !process.env.OIDC_REDIRECT_URI) {
      res.status(500).json({ message: 'OAuth not configured' });
      return;
    }

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const { authUrl } = getGoogleOAuthUrls();

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
      state: crypto.randomBytes(16).toString('hex')
    });

    const redirectUrl = `${authUrl}?${params.toString()}`;
    res.redirect(redirectUrl);
  } catch (e: any) {
    res.status(500).json({ message: 'OAuth init failed', error: e?.message || String(e) });
  }
});

// OAuth callback: exchange code, create local JWT, redirect frontend with token
router.get('/oauth/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const codeVerifier = req.cookies?.pkce_verifier;

    if (!code || !codeVerifier) {
      res.status(400).json({ message: 'Missing authorization code or PKCE verifier' });
      return;
    }

    if (!process.env.OIDC_CLIENT_ID || !process.env.OIDC_REDIRECT_URI) {
      res.status(500).json({ message: 'OAuth not configured' });
      return;
    }

    const { tokenUrl, userInfoUrl } = getGoogleOAuthUrls();

    // Exchange code for access token
    const tokenResponse = await axios.post(tokenUrl, new URLSearchParams({
      client_id: process.env.OIDC_CLIENT_ID,
      client_secret: process.env.OIDC_CLIENT_SECRET || '',
      code: code as string,
      grant_type: 'authorization_code',
      redirect_uri: process.env.OIDC_REDIRECT_URI,
      code_verifier: codeVerifier
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token } = tokenResponse.data;

    // Get user info
    const userResponse = await axios.get(userInfoUrl, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const userInfo = userResponse.data;
    const email = userInfo.email;

    // Ensure local user/staff exists (upsert minimal records)
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ 
        username: email, 
        email, 
        password: 'oauth-no-password' 
      });
    }

    let staff = await Staff.findOne({ email });
    if (!staff) {
      staff = await Staff.create({ 
        name: userInfo.name || email, 
        email, 
        password: 'oauth-no-password', 
        role: 'PATIENT' 
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET';
    const token = jwt.sign(
      { ...user.toObject(), staffDetails: { ...staff.toObject() } }, 
      jwtSecret, 
      { expiresIn: '24h' }
    );

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
  } catch (e: any) {
    res.status(500).json({ message: 'OAuth callback failed', error: e?.message || String(e) });
  }
});

export default router;
