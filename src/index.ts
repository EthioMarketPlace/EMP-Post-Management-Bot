import { Telegraf, Context } from "telegraf";
import connectDB from "./utils/db.js";
import { BOT_TOKEN } from "./utils/dotenv.js";
import EMPBot from "./commands/start.js";
import LanguageHandler from "./commands/language.js";
import SellProductHandler from "./commands/sellProduct.js";

connectDB();

// Create a new instance of Telegraf bot
const bot = new Telegraf(BOT_TOKEN || "");

// starting bot
bot.start((ctx) => {
  const ethioBot = new EMPBot(ctx);
  ethioBot.start("start");
});

//to langauge selection
bot.action("language", (ctx) => {
  const languageHandler = new LanguageHandler(ctx);
  languageHandler.showLanguageOptions();
});

//select langauge
bot.action(["Oromo", "Amhara", "English"], (ctx) => {
  const languageHandler = new LanguageHandler(ctx);
  languageHandler.handleLanguageSelection();
});

//returning home
bot.action("home", (ctx) => {
  const ethioBot = new EMPBot(ctx);
  ethioBot.start("home");
});

//product categories
bot.action("sell", async (ctx) => {
  const sellProductHandler = new SellProductHandler(ctx);
  await sellProductHandler.listCategories();
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
