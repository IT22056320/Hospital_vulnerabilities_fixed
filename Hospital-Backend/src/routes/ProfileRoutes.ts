// src/routes/ProfileRoutes.ts
import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

export default router;
