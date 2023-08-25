import { Context } from "telegraf";
import Keyboard from "../markup/markup.js";

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
    return Keyboard.categories();
  }
}

export default SellProductHandler;
