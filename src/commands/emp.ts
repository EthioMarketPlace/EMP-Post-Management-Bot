import { Context, Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/types";
import Language from "../languages/manager.ts";
import { CustomCallbackQuery } from "../types/interfaces.ts";
import Keyboard from "../markup/markup.ts";

class EMP {
  constructor(private ctx: Context) {}

  private about = Language.Selector(this.ctx.chat?.id.toString() as string)
    .about;
  private contactUs = Language.Selector(this.ctx.chat?.id.toString() as string)
    .contactus;

  private empSocial =
    "🌐 <b>Medias\n\n" +
    `👍 <u>facebook :</u>\n https://www.facebook.com/profile.php?id=100087510051959\n\n` +
    `📷 <u>Instagram :</u> https://www.instagram.com/ethio_market_place/</b>`;

  async display() {
    const homeKbd = Keyboard.redirectToHome();
    await this.sendAboutSection(homeKbd);
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

    this.ctx.editMessageText(message as string, {
      parse_mode: "HTML",
      reply_markup: keyboard.reply_markup,
    });
  }
}

export default EMP;
