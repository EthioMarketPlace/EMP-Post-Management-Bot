import { Context, Types } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/types";
import Keyboard from "../markup/markup.ts";
import { english } from "../languages/english.ts";

class About {
  constructor(private ctx: Context) {}

  async display() {
    //access about section from English language
    const about = english.about;

    //generate inline keyboard that redirects to start page
    const homeKbd = Keyboard.redirectToHome().reply_markup;

    //sending about section to bot
    await this.sendAboutSection(about, homeKbd);
  }

  private async sendAboutSection(
    about: string,
    keyboard: InlineKeyboardMarkup
  ) {
    this.ctx.editMessageText(about, {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  }
}

export default About;
