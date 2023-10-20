import { Context } from "telegraf";
import Cache from "../services/cacheService.ts";
import EMPBot from "./start.ts";
import { reg } from "../types/interfaces.ts";
import { english } from "../languages/english.ts";

class ProductHandler {
  constructor(private ctx: Context) { }

  async confirm() {
    const chatId = this.ctx.chat?.id;

    if (!chatId) {
      return console.log("chat_id not found");
    }
    const cached = Cache.getValue(chatId + "_d") as reg;

    if (!cached) {
      return console.log("cache not found");
    }

    //adding user id to cache object
    cached.id = chatId;

    let pendingPosts = [];
    const pendingCaches = Cache.getValue("pending") as [];
    if (pendingCaches) {
      pendingPosts = pendingCaches;
    }

    Cache.saveCache("pending", pendingPosts.push(cached), 0);

    if (cached.photo)
      //forward message to admin group
      await this.ctx.telegram.sendPhoto(
        process.env.EMP_DEV || "",
        cached.photo,
        {
          caption: english.confG(cached),
          parse_mode: "HTML",
        }
      );
  }

  async cancel() {
    //delete message
    //go home
    await this.ctx.deleteMessage(this.ctx.message?.message_id);
    await new EMPBot(this.ctx).start("start");
  }
}

export default ProductHandler;
