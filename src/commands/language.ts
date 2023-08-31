import { Context, Markup } from "telegraf";
import { CustomCallbackQuery } from "../interfaces/types.js";
import updateLanguageWithRetry from "../utils/updatelanguage.js";
import Cache from "../services/cacheService.js";
import Keyboard from "../markup/markup.js";

class LanguageHandler {
  constructor(private ctx: Context) {}

  private languageOptions() {
    return Keyboard.languageOptions();
  }

  async showLanguageOptions() {
    const keyboard = this.languageOptions();
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

    await this.ctx
      .editMessageText(
        `<b>Select your language:\n\n✅ Selected :</b> 🎗<code>${language}</code>🎗`,
        {
          reply_markup: this.languageOptions().reply_markup,
          parse_mode: "HTML",
        }
      )
      .catch((error) => {
        console.log(error);
      });

    await updateLanguageWithRetry(id!, language, 10); //retry 10 times, incase of connection fails
  }
}

export default LanguageHandler;
