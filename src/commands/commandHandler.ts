import { Context } from "telegraf";
import { CustomTextMessage, reg, status } from "../interfaces/types.ts";
import Cache from "../services/cacheService.ts";
import EMPBot from "./start.ts";
import { english } from "../languages/english.ts";

class CommandHandler {
  constructor(private ctx: Context) {}

  async handler() {
    const message = this.ctx.message as CustomTextMessage;
    const command = message.text.slice(1) as status;
    const cached = this.getCached() as reg;

    if (!cached) return this.returnHome();

    cached.state = command;
    if (cached.photo) delete cached.photo;

    Cache.saveCache(`${this.ctx.chat?.id}_d`, cached, 3600);
    await this.ctx.replyWithHTML(english[command]);
  }

  private getCached() {
    const chatId = this.ctx.chat?.id;
    const cached = Cache.getValue(`${chatId}_d`)!;
    return cached;
  }

  private returnHome() {
    new EMPBot(this.ctx).start("start");
  }
}

export default CommandHandler;
