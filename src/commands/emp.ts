import { Context, Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/types";
import { CustomCallbackQuery } from "../interfaces/cbkQuery.js";

class EMP {
  constructor(private ctx: Context) {}

  //emp fb : https://www.facebook.com/profile.php?id=100087510051959
  //emp insta : https://www.instagram.com/ethio_market_place/

  private about = "This is about section";
  private contactUs = "this is contact us section";
  private empSocial =
    "🌐 <b>Medias\n\n" +
    `👍 <u>faceboob :</u>\n https://www.facebook.com/profile.php?id=100087510051959\n\n` +
    `📷 <u>Instagram :</u> https://www.instagram.com/ethio_market_place/</b>`;

  async display() {
    const homeKbd = this.homeKeyboard();
    await this.sendAboutSection(homeKbd);
  }

  private homeKeyboard() {
    return Markup.inlineKeyboard([
      Markup.button.callback("🏡 Go To Home", "home"),
    ]);
  }

  private async sendAboutSection(
    keyboard: Markup.Markup<InlineKeyboardMarkup>
  ) {
    const cbkQuery = this.ctx.callbackQuery! as CustomCallbackQuery;
    const message =
      cbkQuery?.data === "about"
        ? this.about
        : cbkQuery?.data === "contactUs"
        ? this.contactUs
        : this.empSocial;

    this.ctx.editMessageText(message, {
      parse_mode: "HTML",
      reply_markup: keyboard.reply_markup,
    });
  }
}

export default EMP;
