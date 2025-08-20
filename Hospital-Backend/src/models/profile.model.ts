import mongoose from 'mongoose';

interface IProfile extends mongoose.Document {
  username: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  occupation?: string; // Optional field
  emergencyContactName?: string; // Optional field
  emergencyContactNumber?: string; // Optional field
}

const profileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    address: { type: String, required: true },
    occupation: { type: String, optional: true },
    emergencyContactName: { type: String, optional: true },
    emergencyContactNumber: { type: String, optional: true },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model<IProfile>('Profile', profileSchema);
export default Profile;