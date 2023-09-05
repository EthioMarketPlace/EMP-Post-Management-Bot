import { Context } from "telegraf";
import About from "../src/commands/about";
import { english } from "../src/languages/english";
import Keyboard from "../src/markup/markup";
import { InlineKeyboardMarkup } from "telegraf/types";

describe("About", () => {
  let mockCtx: Context;
  let aboutInstance: About;

  beforeEach(() => {
    // Create a mock context for testing
    mockCtx = {
      editMessageText: jest.fn(),
    } as any;

    aboutInstance = new About(mockCtx);
  });

  it("should display the about section correctly", async () => {
    // Define your expected values
    const expectedAbout = english.about;
    const expectedKeyboard: InlineKeyboardMarkup =
      Keyboard.redirectToHome().reply_markup;

    // Call the display method
    await aboutInstance.display();

    // Verify that editMessageText was called with the expected parameters
    expect(mockCtx.editMessageText).toHaveBeenCalledWith(expectedAbout, {
      parse_mode: "HTML",
      reply_markup: expectedKeyboard,
    });
  });

  // Add more test cases for other methods or scenarios as needed
});
