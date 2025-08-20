// src/routes/AuthRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();
const authController = new AuthController();

router.post(
  '/register',
  [
    body('username').isString().withMessage('Username must be a string'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validateRequest, // Middleware to check validation results
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
  ],
  validateRequest, // Middleware to check validation results
  authController.login
);

export default router;
