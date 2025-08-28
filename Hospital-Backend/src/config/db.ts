import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

class Database {
  private readonly URI: string;

  constructor() {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables");
    }
    this.URI = process.env.MONGO_URI;
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(this.URI);
      console.log("✅ Database connected successfully");
    } catch (error) {
      console.error("❌ Database connection failed", error);
    }
  }
}

export default Database;
