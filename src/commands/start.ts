import { Context, Markup } from "telegraf";
import makeAPICall from "../utils/api.js";
import { InlineKeyboardMarkup } from "telegraf/types";
import cache from "../utils/cache.js";

interface APIResponse {
  last_post_id: number;
}

class EMPBot {
  constructor(private ctx: Context) {}

  async start() {
    try {
      // debugger;
      const inlineKeyboard = this.generateInlineKeyboard();
      await this.sendWelcomeMessage(
        "Welcome to the Ethio Marketplace (EMP) Bot!\n\n<b><i>Loading ...  50%  ...</i></b> ",
        inlineKeyboard
      );

      const welcomeMessage = await this.generateWelcomeMessage();
      await this.sendLatestPost(welcomeMessage, inlineKeyboard);
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
    return Markup.inlineKeyboard([
      [
        Markup.button.callback("📢 Add Channel", "addChannel"),
        Markup.button.callback("💰 Sell Product", "sell"),
      ],
      [Markup.button.callback("🔍 Explore EMP Channels", "exploreChannels")],
      [
        Markup.button.callback(
          "🌐 EMP [ Instagram ] or [ Facebook ]",
          "empsocial"
        ),
      ],
      [
        Markup.button.callback("🗣️ Language", "language"),
        Markup.button.callback("ℹ️ About", "about"),
        Markup.button.callback("📞 Contact Us", "contactUs"),
      ],
    ]);
  }

  private async fetchLatestPost() {
    const postIdFromCache = this.retrivePostIdfromCache();
    const randomCategory = this.selectRandomCategory();
    let lastPostId;

    if (postIdFromCache) {
      lastPostId = postIdFromCache;
    } else {
      try {
        const responseData: APIResponse = JSON.parse(
          await makeAPICall(randomCategory)
        );

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
    const cacheKey = "latest_post_id";
    const finder = cache.get(cacheKey);
    return finder;
  }

  private saveLatestPostIdToCache(postid: number) {
    const cacheKey = "latest_post_id";
    const ttl = 24 * 60 * 60; // 1 day in seconds
    cache.set(cacheKey, postid, ttl);
  }

  private selectRandomCategory(): string {
    const categories = ["EMP_Electronics", "ethio_market_place"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  private async sendWelcomeMessage(
    message: string,
    keyboard: Markup.Markup<InlineKeyboardMarkup>
  ) {
    await this.ctx.reply(message, {
      reply_markup: keyboard.reply_markup,
      parse_mode: "HTML",
    });
  }

  private async sendLatestPost(
    message: string,
    keyboard: Markup.Markup<InlineKeyboardMarkup>
  ) {
    const messageCtx = this.ctx.message || this.ctx.callbackQuery?.message;
    const msgId = messageCtx?.message_id! + 1; //the edited message will be = userMsg_id + 1
    const chatId = messageCtx?.chat.id;

    await this.ctx.telegram.editMessageText(chatId, msgId, undefined, message, {
      parse_mode: "HTML",
      reply_markup: keyboard.reply_markup,
    });
  }
}

export default EMPBot;
