/**
 * Used <Number> as propertys
 * because they are type safe, and Ts won't bother us
 * also makes accessible simpe
 */
export const english = {
  latest: (latest: string) => {
    return (
      `<b>Welcome To Ethio market Place\n\n` +
      `<u>Latest Posts</u>\n` +
      `${latest}` +
      `</b>`
    );
  },
  myproduct: (products: string) => {
    return `<b>All Your Products</b>\n\n` + products;
  },
  manage: (post_id: string) => {
    return `<b> ${process.env.CUSTOMER_CHANNEL}/${post_id}</b>`;
  },
  channel: `Please #Send Your channel @Username or channel Link (https://t.me/...) ?`,
  category: `Choose your product category`,
  about:
    `  👤 <b>Welcome to Ethio Market Place !</b>\n\n` +
    `Ethio Market Place is an online platform,` +
    `that provides a gateway for a customer to buy or sell goods online.\n\n` +
    `The platform has become the best tool that helps people to buy and sell products online.\n\n` +
    `Through the use of this bot, you can search for any product in multiple channels and submit new products or manage your existing products.\n\n` +
    `<b>Why sell on Ethio Market Place?</b>\n` +
    `<code>✅ Bring your products to a new market, and reach more customers.</code>\n` +
    `<code>✅ No fees, 100% free service.</code>\n` +
    `<code>✅ Easy to use and manage your store with our simple interface.</code>\n\n` +
    `Check out already existed product by joining our channel\n` +
    `https://t.me/ethio_market_place`,
  5:
    `⚙️ <b>Languages\n\n` +
    `[Click] To Change Language:\n` +
    `🔘 Oromic : /Oromic\n` +
    `🔘 Amharic : /Amharic\n</b>`,
  6:
    `<b>Step 1: #Title\n\n` +
    `Please Type 🎗 Title for your product ❔</b>\n\n` +
    `❌ <code>Maximum Allowed Character is 200</code>`,
  7:
    `<b>Step 2: #Description\n\n` +
    `Write the 📄 description of the product you want to sell </b>❔\n\n` +
    `❌ <code>Maximum Allowed Character is 500</code>\n\n` +
    `🔘 <b>Edit Title:  /Title\n` +
    `🔘 Go To Home:  /Home</b>`,
  8:
    `<b>Step 3: #Price\n\n` +
    `Type the 💰 price (Birr) of the product you want to sell </b>❔\n` +
    `⚠️ Please use only number e.g 57000\n\n` +
    `🔘 <b>Edit Description:  /Description\n` +
    `🔘 Go To Home:  /Home</b>`,
  9:
    `<b>Step 4: #Contact\n\n` +
    `Share Your 📲 Phone from Telegram</b>\n\n` +
    `❌ <code>Typing is Not Allowed, Just share</code>\n\n` +
    `🔘 <b>Edit Price:  /Price\n` +
    `🔘 Go To Home:  /Home</b>`,
  10:
    `<b>Step 5: #Image\n\n` +
    `Upload 📷 Image of the product you want to sell ❔\n\n` +
    `❌ <code>Only 1 Photo is Allowed</code>\n\n` +
    `🔘 Edit Contact:  /Contact\n` +
    `🔘 Go To Home:  /Home</b>`,
  conf: (data: string | number | any): string => {
    return (
      `✅ <b>Registration Success\n\n` +
      `🎗 ${data[6].toUpperCase()}\n\n` +
      `📄 <i>${data[7]}</i>\n\n` +
      `💰 <code>${data[8]}</code>\n` +
      `📱 <code>${data[9]}</code></b>`
    );
  },
  confG: (data: string | number | any): string => {
    return (
      `✅ <b>New Product\n\n` +
      `🎗 ${data[6].toUpperCase()}\n\n` +
      `📄 <i>${data[7]}</i>\n\n` +
      `💰 <code>${data[8]}</code>\n` +
      `📱 <code>${data[9]}</code></b>`
    );
  },
  confC: (data: any): string => {
    return (
      `<b>✅ New\n\n` +
      `🎗 ${data[6].toUpperCase()}\n\n` +
      `📄 ${data[7]}\n\n   ` +
      `💰 <code>${data[8]} BIRR</code>\n` +
      `   📱 <code>${data[9]}</code>\n` +
      `   👤 @${data.username}</b>\n\n` +
      `#${data.category}\n` +
      `From: @ethio_market_place_bot`
    );
  },
  sold: (post: any): string => {
    return (
      `<b>🛒 Sold\n\n` +
      `🎗 ${post.title.toUpperCase()}\n\n` +
      `📄 ${post.description}\n\n   ` +
      `💰 <code>${post.price} BIRR</code>\n` +
      `   📱 <code>${post.phone}</code>\n\n` +
      `#${post.category}</b>\n` +
      `From: @ethio_market_place_bot`
    );
  },
};
