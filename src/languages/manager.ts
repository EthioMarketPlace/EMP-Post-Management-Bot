// import Buttons from "../buttons";
import { amharic } from "./amharic.ts";
import { oromic } from "./oromic.ts";
import { english } from "./english.ts";
import Cache from "../services/cacheService.ts";

class Language {
  static Selector = (chatid: string) => {
    let { user } = Cache.getValue(chatid) as { user: { language: string } };

    if (user.language == "Amhara") return amharic;
    else if (user.language == "Oromo") return oromic;
    else return english;
  };
}

export default Language;
