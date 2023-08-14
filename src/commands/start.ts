import { Context, Markup } from "telegraf";
import makeAPICall from "../utils/api.js";
import { InlineKeyboardMarkup } from "telegraf/types";

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
        "Welcome to the Ethio Marketplace (EMP) Bot!\n\n<b><i>Loading ...</i></b> ",
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
    const posts = await this.fetchLatestPosts();
    return `Welcome to the Ethio Marketplace (EMP) Bot!\n\n${posts}`;
  }

  private generateInlineKeyboard() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback("Add Channel", "addChannel"),
        Markup.button.callback("Sell Product", "sellProduct"),
      ],
      [Markup.button.callback("Explore EMP Channels", "exploreChannels")],
      [
        Markup.button.callback(
          "EMP [ Instagram ] or [ Facebook ]",
          "empsocial"
        ),
      ],
      [
        Markup.button.callback("Language", "language"),
        Markup.button.callback("About", "about"),
        Markup.button.callback("Contact Us", "contactUs"),
      ],
    ]);
  }

  private async fetchLatestPosts(): Promise<string> {
    // debugger;
    const randomCategory = this.selectRandomCategory();
    try {
      const responseData: APIResponse = JSON.parse(
        await makeAPICall(randomCategory)
      );
      // const responseData: APIResponse = await ax_makeAPICall(randomCategory);

      const lastPostId = responseData.last_post_id;
      const channelLink = `https://t.me/${randomCategory}/`;
      return `${channelLink}${lastPostId}\n`;
    } catch (error) {
      console.error("Error fetching latest posts:", error);
      throw error; // Rethrow the error to be caught in the start() method
    }
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
