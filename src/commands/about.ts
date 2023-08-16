import { Context, Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/types";

class About {
  constructor(private ctx: Context) {}

  async display() {
    const about = "This is About Section";
    const homeKbd = this.homeKeyboard();

    await this.sendAboutSection(about, homeKbd);
  }

  private homeKeyboard() {
    return Markup.inlineKeyboard([
      Markup.button.callback("🏡 Go To Home", "home"),
    ]);
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
