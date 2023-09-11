import { Context } from "telegraf";
import { CustomTextMessage } from "../types/types.ts";
import Cache from "../services/cacheService.js";

class AddChannel {
  constructor(private ctx: Context) {}

  async sendMessage() {
    const message = this.message();
    await this.ctx.reply(message, { parse_mode: "HTML" });
    this.cacheStorage({ state: "channel" });
  }

  private message() {
    return (
      "<b>Please Send Your Channel URL or Channel User Name ❔</b>\n\n" +
      "<i>Example: https://t.me/ethio_market_place  Or\n" +
      "         @ethio_market_place</i>"
    );
  }

  //chat_id_c => cache key for channel registration
  private cacheStorage(data: object) {
    const chat_id = this.ctx.chat?.id;
    Cache.saveCache(`${chat_id}_c`, data, 3600);
  }

  saveChannel() {
    const username = this.getUsername();
    this.cacheStorage({ state: "admin", channel: username });
  }

  private getUsername() {
    const input = this.getInput();
    if (!input) return this.sendMessage();
    let username = "";

    if (input.includes("http")) {
      username = input.replace("https://t.me/", "");
    } else {
      username = input;
    }

    return username;
  }

  private getInput() {
    const message = this.ctx.message! as CustomTextMessage;
    return message && message.text ? message.text : null;
  }
}

export default AddChannel;
