// repository/profile.repository.ts
import IProfile from '../interfaces/profile.interface';
import Profile from '../models/profile.model'; // Adjust based on your project structure
import mongoose from 'mongoose';

class ProfileRepository {
  async create(data: IProfile): Promise<IProfile> {
    const profile = new Profile(data);
    return profile.save();
  }

  async findAll(): Promise<IProfile[]> {
    return Profile.find();
  }

  async findById(id: string): Promise<IProfile | null> {
    return Profile.findById(id);
  }

  async update(id: string, data: Partial<IProfile>): Promise<IProfile | null> {
    return Profile.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IProfile | null> {
    return Profile.findByIdAndDelete(id);
  }
}

export default ProfileRepository;