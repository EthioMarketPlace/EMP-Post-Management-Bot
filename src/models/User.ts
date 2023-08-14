import mongoose from "mongoose";

// Define a schema for the 'users' collection
const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Telegram id
  language: { type: String, enum: ["oromo", "amhara", "english"] }, // Language
  totalPost: { type: Number, default: 0 }, // Total posts by the user
  status: { type: String, enum: ["active", "banned"], default: "active" }, // User status
  postIds: [{ type: Number }], // Array of post-Ids User posted
});

// Create a 'users' model using the schema
const User = mongoose.model("users", userSchema);

module.exports = User;
