import { Context, Markup } from "telegraf";
import { CustomCallbackQuery } from "../types/types.ts";
import Cache from "../services/cacheService.js";
import Keyboard from "../markup/markup.js";
import DB from "../services/databaseService.ts";
import retryOperation from "../utils/updatelanguage.js";

class LanguageHandler {
  constructor(private ctx: Context) {}

  async showLanguageOptions() {
    const keyboard = Keyboard.languageOptions();
    const id = this.ctx.from?.id;
    const { user } = Cache.getValue(id!.toString()) as {
      user: { language: string };
    };

    await this.ctx.editMessageText(
      `<b>Select your language:\n\n✅ Selected :</b> <code>${user.language}</code>`,
      { reply_markup: keyboard.reply_markup, parse_mode: "HTML" }
    );
  }

  private saveToCache(id: number, language: string) {
    let getCache = Cache.getValue(id!.toString()) as {
      user: { language: string };
    };
    getCache!.user.language = language;
    Cache.saveCache(id!.toString(), getCache, 0);
  }

  async handleLanguageSelection() {
    const cbkQuery = this.ctx.callbackQuery! as CustomCallbackQuery;
    const language = cbkQuery.data;
    const id = cbkQuery.message?.chat.id;

    // debugger;
    this.saveToCache(id!, language);

    await this.ctx.editMessageText(
      `<b>Select your language:\n\n✅ Selected :</b> 🎗<code>${language}</code>🎗`,
      {
        reply_markup: Keyboard.languageOptions().reply_markup,
        parse_mode: "HTML",
      }
    );

    await retryOperation(10, () => DB.changeLanguage(id!, language));
  }
}

export default LanguageHandler;
