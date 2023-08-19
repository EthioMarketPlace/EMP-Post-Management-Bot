import { Context } from "telegraf";
import {
  CustomCallbackQuery,
  CustomContactMessage,
  CustomImageMessage,
  CustomTextMessage,
} from "../interfaces/cbkQuery.js";
import cache from "../utils/cache.js";

class Register {
  constructor(private ctx: Context) {}

  category() {
    // - user clicks on one of category list Inline keyboards
    // - create temporary cache `“id_d”:{….}` for `1 hr’s`
    // - save `category:?, state=title`
    // - send a message ask for `title`

    const cbkQuery = this.ctx.callbackQuery! as CustomCallbackQuery;
    const chatId = this.ctx.chat?.id!;
    const input = cbkQuery?.data;
    this.createTemporaryCache(chatId, input);
  }

  private createTemporaryCache(chatId: number, category: string) {
    const data = { category: category, state: "title" };
    cache.set(`${chatId}_d`, data, 3600);//1 hour
  }

  private updateTemporaryCache(cached:any, chatId:number, state:string, input:string|number){
    const newState = (state === "title")?"description":(state === "description")?"price":(state === "price")?"contact":"image";
    cached.state = newState; 
    cached[state] = input;
    
    cache.set(`${chatId}_d`, cached, 3600)
  }

  private async progress() {
    // - on receive Input, access state value which is title,
    // - `title:Input`, update `state: description`, update cache
    // - send a message asking for `description` & /title → back to title

    const chatId = this.ctx.chat?.id;
    const cached: { state: string } = cache.get(`${chatId}_d`)!;

    if (cached) {
      const state = cached?.state;
      const input =
        state === "title" || state === "description" || state === "price"
          ? this.inputText()
          : state === "contact"
          ? this.inputContact()
          : this.inputImage();

      this.updateTemporaryCache(cached,chatId!,state,input!)
    }
  }

  private async sendMessage(state:string){
    await this.ctx.reply(state)
  }

  private inputContact() {
    const message = this.ctx.message! as CustomContactMessage;
    return message.contact;
  }

  private inputText() {
    const message = this.ctx.message! as CustomTextMessage;
    return message.text;
  }

  private inputImage() {
    const message = this.ctx.message! as CustomImageMessage;
    return message.photo[0];
  }
}
