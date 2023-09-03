import { Context, Markup } from "telegraf";
import Cache from "../services/cacheService.ts";
import {
  CustomCallbackQuery,
  CustomContactMessage,
  CustomImageMessage,
  CustomTextMessage,
  reg,
  status,
} from "../types/types.ts";
import { english } from "../languages/english.ts";
import EMPBot from "./start.ts";
import Keyboard from "../markup/markup.ts";

class RegHandler {
  constructor(private ctx: Context) {}

  async handler() {
    const cached = this.getCached() as { state: string };
    if (!cached || !cached.state) {
      return this.returnHome();
    }

    let state = cached.state;

    switch (state) {
      case "title":
        await this.saveTitle();
        break;
      case "description":
        await this.saveDescription();
        break;
      case "price":
        await this.savePrice();
        break;
      case "contact":
        await this.saveContact();
        break;
      case "photo":
        await this.saveImage();
        break;
    }
  }

  //saving category, when user click in one of the category's inline query
  async saveCategory() {
    const cbkQuery = this.ctx.callbackQuery! as CustomCallbackQuery;
    const chatId = this.ctx.chat?.id!;
    const input = cbkQuery?.data;

    Cache.saveCache(`${chatId}_d`, { category: input, state: "title" }, 3600);

    await this.ctx.replyWithHTML(english["title"]);
  }

  async saveTitle() {
    //update cache
    await this.common("title");
  }

  async saveDescription() {
    await this.common("description");
  }

  async savePrice() {
    await this.common("price");
  }

  async saveContact() {
    await this.common("contact");
  }

  //cache needs to be transfered to permanent cache
  async saveImage() {
    await this.common("photo");
    const cached = this.getCached() as reg;

    if (cached && cached.photo)
      await this.ctx.replyWithPhoto(cached.photo, {
        parse_mode: "HTML",
        caption: english.conf(cached),
        reply_markup: Keyboard.product().reply_markup,
      });
  }

  private async common(status: status) {
    const cached = this.getCached() as reg;
    if (cached.state !== status) {
      return this.returnHome();
    }

    const input = this.getInput(status);

    //validate price
    if (cached.state === "price" && !Number(input)) {
      await this.ctx.replyWithHTML(english["price"]);
      return;
    }

    //validate contact
    if (cached.state === "contact" && input === null) {
      await this.ctx.replyWithHTML(english["contact"], { parse_mode: "HTML" });
      return;
    }

    if (cached.state === "photo" && input === null) {
      await this.ctx.replyWithHTML(english["photo"], { parse_mode: "HTML" });
      return;
    }

    const nextState = this.nextState(status);
    cached[status] = input as string;
    cached.state = nextState;

    const chatId = this.ctx.chat?.id;
    Cache.saveCache(`${chatId}_d`, cached, 3600);

    //registration end here
    //after photo are saved then no need to reply the next state message, because no more state exist
    if (cached.photo && cached.state === "photo") {
      return;
    }

    if (nextState === "contact") {
      return await this.ctx.replyWithHTML(
        english[nextState],

        Markup.keyboard([Markup.button.contactRequest("☎️ Share Your Contact")])
          .oneTime()
          .resize()
      );
    }

    await this.ctx.replyWithHTML(english[nextState]);
  }

  private nextState(state: string) {
    return state === "title"
      ? "description"
      : state === "description"
      ? "price"
      : state === "price"
      ? "contact"
      : "photo";
  }

  private getCached() {
    const chatId = this.ctx.chat?.id;
    const cached = Cache.getValue(`${chatId}_d`)!;
    if (!cached) return this.returnHome();
    return cached;
  }

  private getInput(state: status) {
    return state === "title" || state === "description" || state === "price"
      ? this.inputText()
      : state === "contact"
      ? this.inputContact()
      : state === "photo"
      ? this.inputImage()
      : null;
  }

  private inputContact() {
    const message = this.ctx.message! as CustomContactMessage;

    if (!message || !message.contact) return null;

    if (message.chat.id !== message.contact.user_id) return null;

    return message && message.contact ? message.contact.phone_number : null;
  }

  private inputText() {
    const message = this.ctx.message! as CustomTextMessage;
    return message && message.text ? message.text : null;
  }

  private inputImage() {
    const message = this.ctx.message! as CustomImageMessage;
    return message && message.photo ? message.photo[0].file_id : null;
  }

  private returnHome() {
    new EMPBot(this.ctx).start("home");
  }
}

export default RegHandler;
