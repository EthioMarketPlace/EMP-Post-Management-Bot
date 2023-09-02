import { Context, Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/types";
import Keyboard from "../markup/markup.ts";

class Contact {
  constructor(private ctx: Context) {}

  async display() {
    const contact = "This is contactUs Section";
    const homeKbd = this.homeKeyboard();

    await this.sendcontactUs(contact, homeKbd);
  }

  private homeKeyboard() {
    return Keyboard.redirectToHome();
  }

  private async sendcontactUs(
    contact: string,
    keyboard: Markup.Markup<InlineKeyboardMarkup>
  ) {
    this.ctx.editMessageText(contact, {
      parse_mode: "HTML",
      reply_markup: keyboard.reply_markup,
    });
  }
}

export default Contact;