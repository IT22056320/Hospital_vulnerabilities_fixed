// src/services/AuthService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Staff, { IStaff } from '../models/staff.model';  // Assuming Staff schema is used for staff members
import User from '../models/User';

export class AuthService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'JWT_SECRET';
  }

  public async register(username: string, email: string, password: string, role: string): Promise<IStaff | null> {
    try {
      const existingUser = await Staff.findOne({ email });
      if (existingUser) {
        throw new Error('Staff member already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        username,
        email,
        password: hashedPassword
      })
      const newStaff = new Staff({
        name: username,
        email,
        role, // Set the staff role during registration (e.g., doctor, nurse, admin)
        password: hashedPassword
      });

      return await newStaff.save();
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }

  public async login(email: string, password: string): Promise<{ token: string; staffDetails: any, user: any } | null> {
    const user = await User.findOne({
      email,
    })
    if (user === null) {
      throw new Error('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Username & Password Incorrect');
    }
    const staff = await Staff.findOne({ email });
    if (staff === null) {
      throw new Error('Staff member not found for the user');
    }
    const token = jwt.sign({ ...user, staffDetails: { ...staff } }, this.jwtSecret, { expiresIn: '24h' });
    return { token, staffDetails: staff, user };
  }
}
