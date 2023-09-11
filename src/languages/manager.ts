// import Buttons from "../buttons";
import { amharic } from "./amharic.js";
import { oromic } from "./oromic.js";
import { english } from "./english.js";
import Cache from "../services/cacheService.js";

class Language {
  static Selector = (chatid: string) => {
    let { user } = Cache.getValue(chatid) as { user: { language: string } };

    if (user.language == "Amhara") return amharic;
    else if (user.language == "Oromo") return oromic;
    else return english;
  };
}

export default Language;
