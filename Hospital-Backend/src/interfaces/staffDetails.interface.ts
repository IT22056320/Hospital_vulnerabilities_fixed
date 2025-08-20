import mongoose from "mongoose";

interface IStaffDetails extends mongoose.Document {
  staffId: mongoose.Schema.Types.ObjectId;
  workExperience: string;
  about: string;
  degree: string;
  specialization: string;
}

export default IStaffDetails;
