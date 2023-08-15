import { Context, Markup } from "telegraf";

class SellProductHandler {
  constructor(private ctx: Context) {}

  async listCategories(): Promise<void> {
    const categories = this.generateCategoriesKbd();
    await this.ctx.editMessageText(
      "Categories, Click 1 to continue",
      categories
    );
  }

  private generateCategoriesKbd() {
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
}

export default SellProductHandler;
