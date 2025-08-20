import IProfile from '../interfaces/profile.interface';
import ProfileRepository from '../repository/profile.repository';
import mongoose from 'mongoose';

class ProfileService {
  private readonly profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  async create(data: IProfile): Promise<IProfile> {
    return this.profileRepository.create(data);
  }

  async findAll(): Promise<IProfile[]> {
    return this.profileRepository.findAll();
  }

  async findById(id: string): Promise<IProfile | null> {
    return this.profileRepository.findById(id);
  }

  async update(id: string, data: Partial<IProfile>): Promise<IProfile | null> {
    return this.profileRepository.update(id, data);
  }

  async delete(id: string): Promise<IProfile | null> {
    return this.profileRepository.delete(id);
  }
}

export default ProfileService;