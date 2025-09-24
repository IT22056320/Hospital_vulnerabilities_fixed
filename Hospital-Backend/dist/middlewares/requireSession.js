"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSession = requireSession;
function requireSession(req, res, next) {
    // @ts-ignore
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).json({ message: 'Not authenticated' });
}
