import { Request, Response } from 'express';
import Profile from '../interfaces/profile.interface';
import ProfileService from '../services/profile.service';

class ProfileController {

  private readonly profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  async create(req: Request, res: Response) {
    try {
      const profileData: Profile = req.body;
      const profile = await this.profileService.create(profileData);
      res.status(201).json(profile);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedProfile = await this.profileService.update(req.params.id, req.body);
      if (!updatedProfile) {
        res.status(404).json({ message: "Profile not found" });
      } else {
        res.status(200).json(updatedProfile);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const profile = await this.profileService.findById(req.params.id);
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' });
      } else {
        res.status(200).json(profile);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

}

export default ProfileController;