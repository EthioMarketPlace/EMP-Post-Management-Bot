import { Markup } from "telegraf";

class Keyboard {
  static home() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback("📢 Add Channel", "addChannel"),
        Markup.button.callback("💰 Sell Product", "sell"),
      ],
      [Markup.button.callback("🔍 Explore EMP Channels", "exploreChannels")],
      [
        Markup.button.callback(
          "🌐 EMP [ Instagram ] or [ Facebook ]",
          "empsocial"
        ),
      ],
      [
        Markup.button.callback("🗣️ Language", "language"),
        Markup.button.callback("ℹ️ About", "about"),
        Markup.button.callback("📞 Contact Us", "contactUs"),
      ],
    ]);
  }

  static categories() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback("👟 Shoes", "shoes"),
        Markup.button.callback("🚗 Cars", "cars"),
        Markup.button.callback("👩‍🎨 Arts", "arts"),
      ],
      [
        Markup.button.callback("📺 Electronics", "electronics"),
        Markup.button.callback("💄 Cosmetics", "cosmetics"),
      ],
      [
        Markup.button.callback("👕 Clothes", "clothes"),
        Markup.button.callback("🏘️ Houses", "houses"),
      ],
      [Markup.button.callback("🏡 Go To Home", "home")],
    ]);
  }

  static languageOptions() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback("🇺🇸 English", "English"),
        Markup.button.callback("🇪🇹 Oromo", "Oromo"),
        Markup.button.callback("🇪🇹 Amhara", "Amhara"),
      ],
      [Markup.button.callback("🏡 Go To Home", "home")],
    ]);
  }

  static redirectToHome() {
    return Markup.inlineKeyboard([
      Markup.button.callback("🏡 Go To Home", "home"),
    ]);
  }

  static product() {
    return Markup.inlineKeyboard([
      Markup.button.callback("✅ Confirm", "confirm"),
      Markup.button.callback("❌ Cancel", "cancel"),
    ]);
  }

  static contact() {
    return Markup.keyboard([
      Markup.button.contactRequest("☎️ Share Your Contact"),
    ])
      .oneTime()
      .resize();
  }
}

export default Keyboard;
