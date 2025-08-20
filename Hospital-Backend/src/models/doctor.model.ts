import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  workExperience: { type: String, required: true },
  about: { type: String, required: true },
  degree: { type: String, required: true },
  specialization: { type: String, required: true },
  
 
});

const Doctor = mongoose.model('Doctor', doctorSchema); // Register the model
export default Doctor;
