"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/ProfileRoutes.ts
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.get('/profile', verifyToken_1.verifyToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
});
exports.default = router;
