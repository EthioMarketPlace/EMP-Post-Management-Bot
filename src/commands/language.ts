import { Context, Markup } from "telegraf";
import cache from "../utils/cache.js";
import { CustomCallbackQuery } from "../interfaces/langauge.js";
import updateLanguageWithRetry from "../utils/updatelanguagewithretries.js";

class LanguageHandler {
  constructor(private ctx: Context) {}

  private languageOptions() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback("🇺🇸 English", "English"),
        Markup.button.callback("🇪🇹 Oromo", "Oromo"),
        Markup.button.callback("🇪🇹 Amhara", "Amhara"),
      ],
      [Markup.button.callback("🏡 Go To Home", "home")],
    ]);
  }

  async showLanguageOptions() {
    const keyboard = this.languageOptions();

    await this.ctx.editMessageText(
      "<b>Select your language:\n\n✅ Selected :</b> <code>English</code>",
      { reply_markup: keyboard.reply_markup, parse_mode: "HTML" }
    );
  }

  private saveTOCache(id: number, language: string) {
    //check if cache exist:
    let getCache: { language: string } | undefined = cache.get(id!.toString());

    if (getCache) {
      getCache!.language = language;
      cache.set(id!.toString(), getCache);
    } else {
      cache.set(id!.toString(), { language });
    }
  }

  async handleLanguageSelection() {
    const cbkQuery = this.ctx.callbackQuery! as CustomCallbackQuery;
    const language = cbkQuery.data;
    const id = cbkQuery.message?.chat.id;

    // debugger;
    this.saveTOCache(id!, language);

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
