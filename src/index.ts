import { Telegraf, Context } from "telegraf";
import connectDB from "./utils/db.js";
import { BOT_TOKEN } from "./utils/dotenv.js";
import EMPBot from "./commands/start.js";
import LanguageHandler from "./commands/language.js";
import SellProductHandler from "./commands/sellProduct.js";
import Channels from "./commands/exploreChannels.js";
import About from "./commands/about.js";
import ContactUs from "./commands/emp.js";
import EMP from "./commands/emp.js";
import Register from "./commands/registerProduct.js";

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
  sellProductHandler.listCategories();
});

//List EMP All Channels
bot.action("exploreChannels", (ctx) => {
  const channels = new Channels(ctx);
  channels.list();
});

//about section
bot.action(["about", "contactUs", "empsocial"], (ctx) => {
  const emp = new EMP(ctx);
  emp.display();
});

bot.action(
  ["shoes", "cars", "arts", "electronics", "cosmetics", "clothes", "houses"],
  (ctx) => {
    const register = new Register(ctx);
    register.category();
  }
);

bot.on("message", (ctx) => {
  const register = new Register(ctx);
  register.sendMessage();
});

//Global Error handler
bot.catch((err) => {
  console.log(err);
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
