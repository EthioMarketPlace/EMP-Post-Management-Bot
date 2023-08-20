import { Context } from "telegraf";
import {
  CustomCallbackQuery,
  CustomContactMessage,
  CustomImageMessage,
  CustomTextMessage,
} from "../interfaces/cbkQuery.js";
import cache from "../utils/cache.js";
import EMPBot from "./start.js";

class Register {
  constructor(private ctx: Context) {}

  async category() {
    const cbkQuery = this.ctx.callbackQuery! as CustomCallbackQuery;
    const chatId = this.ctx.chat?.id!;
    const input = cbkQuery?.data;
    this.createTemporaryCache(chatId, input);

    await this.ctx.reply("Type title for your product");
  }

  private createTemporaryCache(chatId: number, category: string) {
    const data = { category: category, state: "title" };
    cache.set(`${chatId}_d`, data, 3600); //1 hour
  }

  private nextState(state: string) {
    return state === "title"
      ? "description"
      : state === "description"
      ? "price"
      : state === "price"
      ? "contact"
      : "image";
  }

  private updateTemporaryCache(
    cached: any,
    state: string,
    input: string | number,
    newState: string
  ) {
    const chatId = this.ctx.chat?.id;

    cached.state = newState;
    cached[state] = input;

    cache.set(`${chatId}_d`, cached, 3600);
    console.log(cached);
  }

  private async getState() {
    const chatId = this.ctx.chat?.id;
    const cached: { state: string } = cache.get(`${chatId}_d`)!;
    if (!cached) return await new EMPBot(this.ctx).start("home");
    return cached;
  }

  private getInput(state: string) {
    return state === "title" || state === "description" || state === "price"
      ? this.inputText()
      : state === "contact"
      ? this.inputContact()
      : state === "image"
      ? this.inputImage()
      : null;
  }

  async sendMessage() {
    const cache = (await this.getState()) as { state: string };
    const state = cache.state;
    const input = this.getInput(state) as string | number;
    const nextState = this.nextState(state);

    if (!nextState || !input) {
      await this.ctx.reply(state);
      return;
    }

    if (state === "price" && !Number(input)) {
      await this.ctx.reply(state);
      return;
    }

    if (state === "contact" && input === null) {
      await this.ctx.reply(state);
      return;
    }

    if (state === "image" && input === null) {
      await this.ctx.reply(state);
      return;
    }

    this.updateTemporaryCache(cache, state, input, nextState);
    await this.ctx.reply(nextState);
  }

  private inputContact() {
    const message = this.ctx.message! as CustomContactMessage;
    return message && message.contact ? message.contact : null;
  }

  private inputText() {
    const message = this.ctx.message! as CustomTextMessage;
    return message && message.text ? message.text : null;
  }

  private inputImage() {
    const message = this.ctx.message! as CustomImageMessage;
    return message && message.photo ? message.photo[0] : null;
  }
}

export default Register;
