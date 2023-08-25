import { Context, Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/types";
import Keyboard from "../markup/markup.js";

class About {
  constructor(private ctx: Context) {}

  async display() {
    const about = "This is About Section";
    const homeKbd = this.homeKeyboard();

    await this.sendAboutSection(about, homeKbd);
  }

  private homeKeyboard() {
    return Keyboard.redirectToHome();
  }

  private async sendAboutSection(
    about: string,
    keyboard: Markup.Markup<InlineKeyboardMarkup>
  ) {
    this.ctx.editMessageText(about, {
      parse_mode: "HTML",
      reply_markup: keyboard.reply_markup,
    });
  }
}

export default About;
