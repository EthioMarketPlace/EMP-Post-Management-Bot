import { Telegraf, Context } from "telegraf";
import connectDB from "./utils/db.js";
import { BOT_TOKEN } from "./utils/dotenv.js";
import EMPBot from "./commands/start.js";

connectDB();

// Create a new instance of Telegraf bot
const bot = new Telegraf(BOT_TOKEN || "");
bot.start((ctx) => {
  const ethioBot = new EMPBot(ctx);
  ethioBot.start();
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
