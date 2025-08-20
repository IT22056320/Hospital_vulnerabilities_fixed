import mongoose from "mongoose";
import IStaffDetails from "../interfaces/staffDetails.interface";

const staffDetailsSchema = new mongoose.Schema(
  {
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true }, // Reference to the Staff collection
    workExperience: { type: String, required: true },
    about: { type: String, required: true },
    degree: { type: String, required: true },
    specialization: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const StaffDetails = mongoose.model<IStaffDetails>("StaffDetails", staffDetailsSchema);
export default StaffDetails;
