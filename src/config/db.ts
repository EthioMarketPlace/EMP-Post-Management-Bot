// mongoose.js
import mongoose from "mongoose";
import { DB_URL } from "./dotenv.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(DB_URL || "");
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
