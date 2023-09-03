import { Context, Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/types";
import Keyboard from "../markup/markup.ts";

class Channels {
  constructor(private ctx: Context) {}

  async list() {
    const channels = this.channelLists();
    const keyboard = Keyboard.redirectToHome();
    await this.sendChannelList(channels, keyboard);
  }

  private channelLists(): string {
    return (
      `<b>📢 Channels:</b>\n\n` +
      `📺 <b>Electronics :</b>   @Emp_electronics\n` +
      `👟 <b>Shoes :</b>   @Emp_shoes\n` +
      `👕 <b>Clothes :</b>   @Emp_clothes\n` +
      `🚗 <b>Cars :</b>   @Emp_cars\n` +
      `🏘️ <b>Houses :</b>   @Emp_houses\n` +
      `💄 <b>Cosmetics :</b>   @EMP_Cosmetics\n` +
      `👩‍🎨 <b>Arts :</b>   @EMP_Arts\n` +
      `🛒 <b>Others :</b>   @Emp_Others\n`
    );
  }

  private async sendChannelList(
    channels: string,
    keyboard: Markup.Markup<InlineKeyboardMarkup>
  ) {
    await this.ctx.editMessageText(channels, {
      parse_mode: "HTML",
      reply_markup: keyboard.reply_markup,
    });
  }
}

export default Channels;
