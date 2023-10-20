import { Context } from "telegraf";
import { CustomCallbackQuery } from "../types/interfaces.ts";

import Cache from "../services/cacheService.ts";
import Keyboard from "../markup/markup.ts";
import DB from "../services/databaseService.ts";
import retryOperation from "../utils/updatelanguage.ts";

class LanguageHandler {
  constructor(private ctx: Context) {}

  async showLanguageOptions() {
    const keyboard = Keyboard.languageOptions();
    const id = this.ctx.from?.id;

    const { user } = (await Cache.getValue(id!.toString())) as {
      user: { language: string };
    };

    await this.ctx.editMessageText(
      `<b>Select your language:\n\n✅ Selected :</b> <code>${user.language}</code>`,
      { reply_markup: keyboard.reply_markup, parse_mode: "HTML" }
    );
  }

  private async saveToCache(id: number, language: string) {
    let getCache = (await Cache.getValue(id!.toString())) as {
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
