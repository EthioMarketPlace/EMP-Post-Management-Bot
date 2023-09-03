import { Context } from "telegraf";
import { CustomTextMessage, reg, status } from "../types/types.ts";
import Cache from "../services/cacheService.ts";
import EMPBot from "./start.ts";
import { english } from "../languages/english.ts";
import Keyboard from "../markup/markup.ts";

class CommandHandler {
  constructor(private ctx: Context, private empBot?: EMPBot) {}

  async handler() {
    const message = this.ctx.message as CustomTextMessage;
    const command = message.text.slice(1) as status;
    const cached = this.getCached() as reg;

    if (!cached) return this.returnHome();

    cached.state = command;
    if (cached.photo) delete cached.photo;

    Cache.saveCache(`${this.ctx.chat?.id}_d`, cached, 3600);
    if (command === "contact") {
      return await this.ctx.replyWithHTML(english[command], Keyboard.contact());
    } else {
      await this.ctx.replyWithHTML(english[command]);
    }
  }

  private getCached() {
    const chatId = this.ctx.chat?.id;
    const cached = Cache.getValue(`${chatId}_d`)!;
    return cached;
  }

  private returnHome() {
    this.empBot!.start("start");
    // new EMPBot(this.ctx).start("start");
  }
}

export default CommandHandler;
