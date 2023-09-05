import { Context, Markup } from "telegraf";
import { CustomCallbackQuery } from "../types/types.ts";
import updateLanguageWithRetry from "../utils/updatelanguage.js";
import Cache from "../services/cacheService.js";
import Keyboard from "../markup/markup.js";
import DB from "../services/databaseService.ts";
import retryOperation from "../utils/updatelanguage.js";

class LanguageHandler {
  constructor(private ctx: Context) {}

  async showLanguageOptions() {
    const keyboard = Keyboard.languageOptions();

    await this.ctx.editMessageText(
      "<b>Select your language:\n\n✅ Selected :</b> <code>English</code>",
      { reply_markup: keyboard.reply_markup, parse_mode: "HTML" }
    );
  }

  private saveTOCache(id: number, language: string) {
    //check if cache exist:
    let getCache = Cache.getValue(id!.toString()) as { language: string };

    if (getCache) {
      getCache!.language = language;

      Cache.saveCache(id!.toString(), getCache, 0);
    } else {
      Cache.saveCache(id!.toString(), { language }, 0);
    }
  }

  async handleLanguageSelection() {
    const cbkQuery = this.ctx.callbackQuery! as CustomCallbackQuery;
    const language = cbkQuery.data;
    const id = cbkQuery.message?.chat.id;

    // debugger;
    this.saveTOCache(id!, language);

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
