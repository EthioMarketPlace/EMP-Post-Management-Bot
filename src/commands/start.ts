import { Context, Markup } from "telegraf";
import makeAPICall from "../utils/api.ts";
import { InlineKeyboardMarkup } from "telegraf/types";
import Cache from "../services/cacheService.ts";
import Keyboard from "../markup/markup.ts";

class EMPBot {
  constructor(private ctx: Context) {}

  async start(to: string) {
    try {
      // debugger;
      const inlineKeyboard = this.generateInlineKeyboard();
      await this.sendWelcomeMessage(
        "Welcome to the Ethio Marketplace (EMP) Bot!\n\n<b><i>Loading ...  50%  ...</i></b> ",
        inlineKeyboard,
        to
      );

      const welcomeMessage = await this.generateWelcomeMessage();
      await this.sendLatestPost(welcomeMessage, inlineKeyboard, to);
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, maybe send an error message to the user
    }
  }

  private async generateWelcomeMessage(): Promise<string> {
    const posts = await this.fetchLatestPost();
    return `Welcome to the Ethio Marketplace (EMP) Bot!\n\n${posts}`;
  }

  private generateInlineKeyboard() {
    return Keyboard.home();
  }

  private async fetchLatestPost() {
    const postIdFromCache = this.retrivePostIdfromCache();
    const randomCategory = this.selectRandomCategory();
    let lastPostId;

    if (postIdFromCache) {
      lastPostId = postIdFromCache;
    } else {
      try {
        const responseData = await makeAPICall(randomCategory);

        lastPostId = responseData.last_post_id;
        this.saveLatestPostIdToCache(lastPostId);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
        throw error; // Rethrow the error to be caught in the start() method
      }
    }
    const channelLink = `https://t.me/${randomCategory}/`;
    return `${channelLink}${lastPostId}\n`;
  }

  private retrivePostIdfromCache() {
    return Cache.getValue("latest_post_id");
  }

  private saveLatestPostIdToCache(postid: number) {
    Cache.saveCache("latest_post_id", postid, 24 * 60 * 60);
  }

  private selectRandomCategory(): string {
    const categories = ["EMP_Electronics", "ethio_market_place"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  private async sendWelcomeMessage(
    message: string,
    keyboard: Markup.Markup<InlineKeyboardMarkup>,
    to: string
  ) {
    if (to === "start")
      await this.ctx.reply(message, {
        reply_markup: keyboard.reply_markup,
        parse_mode: "HTML",
      });
    else
      await this.ctx.editMessageText(message, {
        reply_markup: keyboard.reply_markup,
        parse_mode: "HTML",
      });
  }

  private async sendLatestPost(
    message: string,
    keyboard: Markup.Markup<InlineKeyboardMarkup>,
    to: string
  ) {
    const messageCtx = this.ctx.message || this.ctx.callbackQuery?.message;
    const msgId =
      to === "start" ? messageCtx?.message_id! + 1 : messageCtx?.message_id!; //the edited message will be = userMsg_id + 1
    const chatId = messageCtx?.chat.id;

    await this.ctx.telegram.editMessageText(chatId, msgId, undefined, message, {
      parse_mode: "HTML",
      reply_markup: keyboard.reply_markup,
    });
  }
}

export default EMPBot;
