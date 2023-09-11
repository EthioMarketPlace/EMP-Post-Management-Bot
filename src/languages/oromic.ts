export const oromic = {
  latest: (latest: string) => {
    return (
      `<b>Baga Nagaan gara Bakka Ethio Gabaa dhuftan\n\n` +
      `Oomisha Dhihotti Gadhifaman:\n` +
      `${latest}` +
      `</b>`
    );
  },
  myproduct: (products: string) => {
    return `<b>Oomisha Keessan Hunda</b>\n\n` + products;
  },
  manage: (post_id: string) => {
    return `<b> ${process.env.CUSTOMER_CHANNEL}/${post_id}</b>`;
  },
  channel: `Channel Keessan @Username ykn Channel Link #Ergi (https://t.me/...) ?`,
  category: "Gosoota Oomishaa Jiran keessaa filadhu",
  about:
    `Baga gara Bakka Ethio Gabaa dhuftan\n\n` +
    `<i>Ethio Gabaan waltajjii toora interneetii irratti argamudha,` +
    `kan maamiltoonni meeshaalee toora interneetii irraa bitachuu ykn gurguruuf karra ta’u</i>\n\n` +
    `<i>Waltajjiin kun meeshaa hundarra gaarii ta'ee fi namoonni oomisha toora interneetii irratti bitachuu fi gurguruuf gargaaru ta'eera` +
    `Fayyadama bot kanaatiin oomisha kamiyyuu karaa hedduudhaan barbaaduu fi oomisha haaraa galchuu` +
    `ykn oomisha keessan jiru bulchuu dandeessu.</i>\n\n` +
    `<b>Maaliif Bakka Ethio Gabaa tti gurgura?</b>\n` +
    `✅ <code>Oomisha keessan gara gabaa haaraatti fidaa, maamiltoota hedduu bira ga'aa.\n` +
    `✅ Kaffaltii hin qabu, tajaajila 100% bilisaa.\n` +
    `✅ Interface keenya salphaa ta'een itti fayyadamuu fi mana daldalaa keessan bulchuuf salphaadha</code>\n\n` +
    `Chaanaalii keenya join gochuun oomisha duraan jiru daawwadhaa\n` +
    `https://t.me/ethio_market_place`,
  contactus:
    `<b>Contact Us</b>\n\n` +
    `Rakkoon bot irratti yoo isin mudate, yaada, ykn waan biraa yoo qabaattan tokko keenya qunnamaa.\n` +
    `@Me_abd\n` +
    `@SolAdola\n` +
    `@abduselam_m\n` +
    `@pastoryoda\n`,
  language:
    `⚙️ <b>Qooqa Jijiruuf\n\n` +
    `Qooqa Jijiruuf 1 [xuqi]:\n` +
    `🔘 Amharic : /Amharic\n` +
    `🔘 English : /English</b>`,
  title:
    `<b>Dursa 1: #Mata Dure\n\n` +
    `🎗 Mata dure Oomisha kee barreessi ❔</b>\n\n` +
    `❌ <code>Yoo baayate qubee 200</code>`,
  description:
    `<b>Lammaffaarratti 2: #Ibsa\n\n` +
    `📄 Ibsa Oomisha  kee barreessun itti fufi❔</b>❔\n\n` +
    `❌ <code>Yoo baayate qubee 500</code>\n\n` +
    `🔘 <b>Mata duree Jijiruuf:  /Title\n` +
    `🔘 Gara Jalqabaatti deebi'uuf:  /Home</b>`,
  price:
    `<b>Sadaffaarratti 3: #kafaltii\n\n` +
    `💰 Kafaltii (Birr) Oomisha kee ittin gurguru barbaaddu barreessi</b>❔\n` +
    `⚠️ Lakkoofsa qofa fayadami fknf 57000\n\n` +
    `🔘 <b>ibsa jijiruuf:  /Description\n` +
    `🔘 Gara jalqabaatti deebi'uuf:  /Home</b>`,
  contact:
    `<b>Afuraffarratti 4: #Bilbila\n\n` +
    `Lakkofsa 📲 bilbilaa kee Telegrami irraa jiru qoodi</b>\n\n` +
    `❌ <code>baressun hin eeyyamamu,  phone kan jedhu cuqaasi</code>\n\n` +
    `🔘 <b>Kafaltii Jijjiiruuf:  /Price\n` +
    `🔘 Gara jalqabati deebi'uuf:  /Home</b>`,
  photo:
    `<b>Shanaffaarratti 5: #Suura\n\n` +
    `📷 Suuraa Oomisha kee tokko (1) faayila kan jedhu baniitii erg ❔\n\n` +
    `❌ <code>Suuraa tokko (1) qofaatu Eeyyamama</code>\n\n` +
    `🔘 Bilbila Jijiruuf:  /Contact\n` +
    `🔘 Gara Jalqabati Jijiruuf:  /Home</b>`,
  conf: (data: string | number | any): string => {
    return (
      `✅ <b>Milka'inaan galma'eera\n\n` +
      `#${data.category}\n\n` +
      `🎗 ${data.title.toUpperCase()}\n\n` +
      `📄 <i>${data.description}</i>\n\n` +
      `💰 <code>${data.price}</code>\n` +
      `📱 <code>${data.contact}</code></b>`
    );
  },
  confG: (data: string | number | any): string => {
    return (
      `✅ <b>Oomisha haaraa\n\n` +
      `🎗 ${data.title.toUpperCase()}\n\n` +
      `📄 <i>${data.description}</i>\n\n` +
      `💰 <code>${data.price}</code>\n` +
      `📱 <code>${data.contact}</code></b>`
    );
  },
  confC: (data: any): string => {
    return (
      `🎗 <b>${data.title.toUpperCase()}\n\n` +
      `📄 ${data.description}\n\n   ` +
      `💰 <code>${data.price} BIRR</code>\n` +
      `   📱 <code>${data.contact}</code>\n` +
      `   👤 @${data.username}</b>\n\n` +
      `#${data.category}\n` +
      `From: @ethio_market_place_bot`
    );
  },
  sold: (post: any): string => {
    return (
      `<b>🛒 gurgurame\n\n` +
      `🎗 ${post.title.toUpperCase()}\n\n` +
      `📄 ${post.description}\n\n   ` +
      `💰 <code>${post.price} BIRR</code>\n` +
      `   📱 <code>${post.phone}</code>\n\n` +
      `#${post.category}</b>\n` +
      `@ethio_market_place_bot`
    );
  },
};
