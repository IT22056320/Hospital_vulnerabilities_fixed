// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { asyncHandler } from '../helpers/asyncHandler';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, role } = req.body;
    const newStaff = await this.authService.register(username, email, password, role);
    if (newStaff) {
      res.status(201).json({ message: 'Staff registered successfully', staff: newStaff });
    } else {
      res.status(400).json({ message: 'Staff registration failed' });
    }
  });

  public login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const result = await this.authService.login(email, password);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
}
