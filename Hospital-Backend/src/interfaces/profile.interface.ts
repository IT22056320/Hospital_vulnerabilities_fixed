// interfaces/profile.interface.ts
import mongoose from 'mongoose';

export default interface IProfile extends mongoose.Document {
  username: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  occupation?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}
