import Cache from "../src/services/cacheService";
import LanguageHandler from "../src/commands/language";
import Keyboard from "../src/markup/markup";
import DB from "../src/services/databaseService";

jest.mock("../src/services/cacheService");
jest.mock("../src/services/databaseService");

describe("Language Handler", () => {
  const ctx = {
    from: {
      id: "123",
    },
    callbackQuery: { data: "English", message: { chat: { id: "123" } } },
    editMessageText: jest.fn(),
  };
  test("showLanguageOptions() completed succesfully", async () => {
    Cache.getValue = jest
      .fn()
      .mockResolvedValueOnce({ user: { language: "English" } });
    await new LanguageHandler(ctx as any).showLanguageOptions();
    expect(ctx.editMessageText).toHaveBeenCalledWith(
      `<b>Select your language:\n\n✅ Selected :</b> <code>English</code>`,
      {
        reply_markup: Keyboard.languageOptions().reply_markup,
        parse_mode: "HTML",
      }
    );
  });

  test("handleLanguageSelection() succesfully completed", async () => {
    Cache.getValue = jest
      .fn()
      .mockResolvedValueOnce({ user: { language: "English" } });

    DB.changeLanguage = jest
      .fn()
      .mockResolvedValueOnce({ id: "123", language: "English" });

    await new LanguageHandler(ctx as any).handleLanguageSelection();

    expect(Cache.getValue).toBeCalledWith("123");

    expect(Cache.saveCache).toBeCalledWith(
      "123",
      { user: { language: "English" } },
      0
    );

    expect(ctx.editMessageText).toHaveBeenCalledWith(
      `<b>Select your language:\n\n✅ Selected :</b> 🎗<code>English</code>🎗`,
      {
        reply_markup: Keyboard.languageOptions().reply_markup,
        parse_mode: "HTML",
      }
    );

    expect(DB.changeLanguage).toBeCalled();
  });
});
