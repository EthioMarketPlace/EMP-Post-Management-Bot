import { Context, Telegram, Markup } from "telegraf";
import EMPBot from "../src/commands/start";

import makeAPICall from "../src/utils/api";

jest.mock("../src/utils/api"); // Mock the external function

describe("EMPBot", () => {
  let bot: EMPBot;
  let mockCtx: Context;

  // Create a mock message context
  const messageCtx = {
    message_id: 123, // Example message ID
    chat: {
      id: 456, // Example chat ID
    },
  };

  beforeEach(() => {
    // Create a mock context for testing
    mockCtx = {
      reply: jest.fn(),
      editMessageText: jest.fn(),
      telegram: {
        editMessageText: jest.fn(),
      } as unknown as Telegram,
      message: messageCtx,
      callbackQuery: { message: messageCtx },
    } as unknown as Context;

    bot = new EMPBot(mockCtx);
  });

  test("start method is succesfuly finished", async () => {
    // Mock the necessary methods used in the start method
    bot["generateInlineKeyboard"] = jest
      .fn()
      .mockReturnValue({ reply_markup: {} });
    bot["generateWelcomeMessage"] = jest
      .fn()
      .mockResolvedValue("Welcome message");
    bot["sendLatestPost"] = jest.fn();

    await bot.start("start");

    // Check if the expected actions are called on the mock context
    expect(mockCtx.reply).toHaveBeenCalled();
    expect(bot["generateInlineKeyboard"]).toHaveBeenCalled();
    expect(bot["generateWelcomeMessage"]).toHaveBeenCalled();
    expect(bot["sendLatestPost"]).toHaveBeenCalled();
  });

  test("generateWelcomeMessage returns a welcome message with latest posts", async () => {
    // Mock the fetchLatestPost function
    const mockFetchLatestPost = jest.fn().mockResolvedValue("Latest posts");
    bot["fetchLatestPost"] = mockFetchLatestPost;

    // Call the method under test
    const result = await bot["generateWelcomeMessage"]();

    // Verify the result
    expect(result).toContain("Welcome to the Ethio Marketplace (EMP) Bot!");
    expect(result).toContain("Latest posts");
    expect(mockFetchLatestPost).toHaveBeenCalled();
  });

  it("should send a welcome message", async () => {
    // Mock the response of makeAPICall
    (makeAPICall as jest.Mock).mockResolvedValue({ last_post_id: 123 });

    // Create a mock message context
    const messageCtx = {
      message_id: 123, // Example message ID
      chat: {
        id: 456, // Example chat ID
      },
    };

    // Create a mock context for testing
    mockCtx = {
      reply: jest.fn(),
      editMessageText: jest.fn(),
      telegram: {
        editMessageText: jest.fn(),
      } as unknown as Telegram,
      message: messageCtx,
      callbackQuery: { message: messageCtx },
    } as unknown as Context;

    bot = new EMPBot(mockCtx);

    // Call the bot method you want to test
    await bot.start("start");
    // Check if the expected actions are called on the mock context
    expect(mockCtx.telegram.editMessageText).toHaveBeenCalledWith(
      expect.any(Number), // chatId
      expect.any(Number), // msgId
      undefined, // inlineMessageId
      expect.any(String), // message
      expect.objectContaining({
        parse_mode: "HTML",
        reply_markup: expect.any(Object),
      })
    );
  });
});
