// import Buttons from "../buttons";
import { amharic } from "./amharic.js";
import { oromic } from "./oromic.js";
import { english } from "./english.js";
import Cache from "../services/cacheService.js";

class Language {
  static Selector = (ctx: any): any => {
    //Chat id from <cache>
    let _ChatId: any = Cache.getValue(ctx.chat.id);

    //<_L> stands for language
    if (_ChatId && _ChatId._L) {
      if (_ChatId._L == "Amharic") return amharic;
      else if (_ChatId._L == "Oromic") return oromic;
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
