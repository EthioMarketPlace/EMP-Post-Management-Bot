// import Buttons from "../buttons";
import { amharic } from "./amharic.js";
import { oromic } from "./oromic.js";
import { english } from "./english.js";
import Cache from "../services/cacheService.js";
import { Context } from "telegraf";

class Language {
  static Selector = (ctx: Context): any => {
    //Chat id from <cache>
    let { user } = Cache.getValue(ctx.chat?.id.toString() || "") as {
      user: { language: string };
    };

    //<_L> stands for language
    if (user && user.language) {
      if (user.language == "Amhara") return amharic;
      else if (user.language == "Oromo") return oromic;
      else return english;
    }
    //the Default <English>
    return english;
  };

  // static _S(ctx: any) {
  //   let _Cmd = ctx.message.text
  //   //whenever oromic used, cache will be empty
  //   cache.set(ctx.chat.id, { _L: _Cmd.slice(1) })

  //   ctx.replyWithHTML(_Cmd.slice(1) + ' ✅', {
  //     reply_markup: {
  //       inline_keyboard: [[Buttons.Home]],
  //     },
  //   })
  // }
}

// export default Selector
export default Language;
