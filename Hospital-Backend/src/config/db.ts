import mongoose from "mongoose";

class Database {
  private readonly URI: string;

  constructor() {
    this.URI =
      process.env.MONGO_URI || 'mongodb+srv://staticcodeanalyzer:8OMHzLFj7ieezIUv@cluster0.ubsop.mongodb.net/hospital_db?retryWrites=true&w=majority&appName=Cluster0';
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(this.URI);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed");
    }
  }
}

export default Database;