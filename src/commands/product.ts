import { Context } from "telegraf";
import Cache from "../services/cacheService.ts";
import EMPBot from "./start.ts";
import { reg } from "../types/interfaces.ts";
import { english } from "../languages/english.ts";

class ProductHandler {
  constructor(private ctx: Context, private empBot?: EMPBot) {}

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

    let pendingPosts: any[] = [];
    const pendingCaches = Cache.getValue("pending") as [];
    if (pendingCaches) {
      pendingPosts = pendingCaches;
    }
    pendingPosts.push(cached);
    Cache.saveCache("pending", pendingPosts, 0);

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
    await this.ctx.deleteMessage(this.ctx.message?.message_id);
    this.empBot?.start("start");
  }
}

export default ProductHandler;
