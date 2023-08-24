import dotenv from "dotenv";

dotenv.config(); // Load .env from the root directory by default

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const DB_URL = process.env.MONGO_URL;
export const API = process.env.API;
// Add other environment variables here
