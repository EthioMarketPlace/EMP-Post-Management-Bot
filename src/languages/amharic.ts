import { reg } from "../types/interfaces.ts";

export const amharic = {
  latest: (latest: string) => {
    return (
      `<b>እንኳን ወደ ኢትዮ የገበያ ቦታ በደህና መጡ\n\n` +
      `<u>የቅርብ ጊዜ ምርቶች</u>\n` +
      `${latest}` +
      `</b>`
    );
  },
  myproduct: (products: string) => {
    return `<b>ሁሉም የእርስዎ ምርቶች</b>\n\n` + `${products}`;
  },
  manage: (post_id: string) => {
    return (
      `<b> ${process.env.CUSTOMER_CHANNEL}/${post_id}\n\n` +
      `ምርቱ አስቀድሞ ከተሸጠ Sold የሚለውን ቁልፍ ይንኩ። ከዚያ ሊንኩን ያረጋግጡ </b>`
    );
  },
  channel: `እባኮዎ #Send የእርስዎ ቻናል @Username ወይም ቻናል ሊንክ (https://t.me/...) ?`,
  category: `የእርስዎን የምርት መደብ ይምረጡ`,
  about:
    `  👤 <b>እንኳን ወደ ኢትዮ የገበያ ቦታ በደህና መጡ !</b>\n\n` +
    `የዚህ ቦት ዎና አላማ ሻጭን እና ገዢን ማገናኘት ሲሆን ይህን ቦት በመጠቀም ያለገደብ እቃዎን መሸጥ ይችላሉ፡፡` +
    `<b>ለምን በኢትዮ የገበያ ቦታ ይሸጣሉ?</b>\n` +
    `<code>✅ ምርቶችዎን ወደ አዲስ ገበያ ያቅርቡ እና ብዙ ደንበኞችን ያግኙ።</code>\n` +
    `<code>✅ ምንም ክፍያ የለም፣ 100% ነፃ አገልግሎት።</code>\n` +
    `<code>✅ ምርቶችዎን በእኛ ቦት ለመጠቀም እና ለማስተዳደር ቀላል።</code>\n\n` +
    `ቻናላችንን በመቀላቀል ያሉትን ምርቶች ይመልከቱ\n` +
    `https://t.me/ethio_market_place`,
  contactus:
    `<b>Contact Us</b>\n\n` +
    `በቦት ላይ ምንም አይነት ችግር ካጋጠመዎት እባክዎን ከእኛ አንዱን ያነጋግሩ።\n` +
    `@Me_abd\n` +
    `@SolAdola\n` +
    `@abduselam_m\n` +
    `@pastoryoda\n`,
  language:
    `⚙️ <b>ቋንቋዎች\n\n` +
    `[Click] ቋንቋ ለመቀየር:\n` +
    `🔘 Oromic : /Oromic\n` +
    `🔘 English : /English\n</b>`,
  title:
    `<b> አንደኛ: #Title\n\n` +
    `እባክዎን ለምርትዎ ርዕስ 🎗 ይጻፉ ❔</b>\n\n` +
    `❌ <code>የሚፈቀደው ከፍተኛው ፊደል 200 ነው።</code>`,
  description:
    `<b> ሁለተኛ: #Description\n\n` +
    `ለመሸጥ የሚፈልጉትን ምርት 📄 መግለጫ ይጻፉ</b>❔\n\n` +
    `❌ <code>የሚፈቀደው ከፍተኛው ፊደል 500 ነው።</code>\n\n` +
    `🔘 <b>ርዕሱን አስተካክሉ:  /Title\n` +
    `🔘 ወደ ቤት ይሂዱ:  /Home</b>`,
  price:
    `<b> ሶስተኛ: #Price\n\n` +
    `ለመሸጥ የሚፈልጉትን ምርት 💰 ዋጋ (ብር) ይጻፉ</b>❔\n` +
    `⚠️ እባክዎ ቁጥር ብቻ ይጠቀሙ። ለምሳሌ 57000\n\n` +
    `🔘 <b>መግለጫውን አስተካክሉ:  /Description\n` +
    `🔘 ወደ ቤት ይሂዱ:  /Home</b>`,
  contact:
    `<b> አራተኛ: #Contact\n\n` +
    `📲 ስልካችሁን ከቴሌግራም ሼር አድርጉ</b>\n\n` +
    `❌ <code>መጻፍ አይፈቀድም ፣ በቀላሉ ሼር ያጋሩ</code>\n\n` +
    `🔘 <b>ዋጋውን አስተካክሉ:  /Price\n` +
    `🔘 ወደ ቤት ይሂዱ:  /Home</b>`,
  photo:
    `<b> አምስተኛ: #Image\n\n` +
    `መሸጥ የሚፈልጉትን ምርት ምስል 📷 ይላኩ ❔\n\n` +
    `❌ <code>1 ፎቶ ብቻ ነው የሚፈቀደው።</code>\n\n` +
    `🔘 ስልካችሁን አስተካክሉ:  /Contact\n` +
    `🔘 ወደ ቤት ይሂዱ:  /Home</b>`,
  conf: (data: string | number | any): string => {
    return (
      `✅ <b>የምዝገባ በተሳካ ሁኔታ ተጠናቋል \n\n` +
      `#${data.category}\n\n` +
      `🎗 ${data.title.toUpperCase()}\n\n` +
      `📄 <i>${data.description}</i>\n\n` +
      `💰 <code>${data.price}</code>\n` +
      `📱 <code>${data.contact}</code></b>`
    );
  },
  confG: (data: reg): string => {
    return (
      `✅ <b>አዲስ ምርት\n\n` +
      `#${data.category}\n\n` +
      `🎗 ${data.title.toUpperCase()}\n\n` +
      `📄 <i>${data.description}</i>\n\n` +
      `💰 <code>${data.price}</code>\n` +
      `📱 <code>${data.contact}</code></b>`
    );
  },
  confC: (data: any): string => {
    return (
      `<b>✅ አዲስ\n\n` +
      `🎗 ${data.title.toUpperCase()}\n\n` +
      `📄 ${data.description}\n\n   ` +
      `💰 <code>${data.price} ብር</code>\n` +
      `   📱 <code>${data.contact}</code>\n` +
      `   👤 @${data.username}</b>\n\n` +
      `#${data.category}\n` +
      `ከ: @ethio_market_place_bot`
    );
  },
  sold: (post: any): string => {
    return (
      `<b>🛒 ተሽጧል\n\n` +
      `🎗 ${post.title.toUpperCase()}\n\n` +
      `📄 ${post.description}\n\n   ` +
      `💰 <code>${post.price} ብር</code>\n` +
      `   📱 <code>${post.phone}</code>\n\n` +
      `#${post.category}</b>\n` +
      `ከ: @ethio_market_place_bot`
    );
  },
};
