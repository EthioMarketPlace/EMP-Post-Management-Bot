import { Context } from "telegraf";
import { english } from "../src/languages/english";
import Keyboard from "../src/markup/markup";
import CommandHandler from "../src/commands/commandHandler";
import { CustomTextMessage } from "../src/interfaces/types";
import Cache from "../src/services/cacheService";
import EMPBot from "../src/commands/start";

// Mock the necessary dependencies
jest.mock("../src/services/cacheService");

describe("Command Handler", () => {
  let mockCtx: Context;
  let commandInstance: CommandHandler;

  beforeEach(() => {
    // Create a mock context for testing
    mockCtx = {
      message: {
        text: "/contact", // Replace with your desired command
      } as CustomTextMessage,
      chat: {
        id: 123, // Replace with your desired chat ID
      },
      replyWithHTML: jest.fn(),
    } as any;

    commandInstance = new CommandHandler(mockCtx);
  });

  it("should handle all commands correctly", async () => {
    // Mock the cache value
    const cachedValue = {
      // Replace with your desired cached data
      state: "contact",
      photo: "somePhoto",
    };
    Cache.getValue = jest.fn().mockReturnValueOnce(cachedValue);

    // Call the handler method
    await commandInstance.handler();

    // Check if the cache was retrieved
    expect(Cache.getValue).toHaveBeenCalledWith("123_d");

    // Check if the cache was updated correctly
    expect(Cache.saveCache).toHaveBeenCalledWith(
      "123_d",
      {
        state: "contact",
      },
      3600
    );

    // Check if replyWithHTML was called with the correct parameters
    expect(mockCtx.replyWithHTML).toHaveBeenCalledWith(
      english.contact,
      Keyboard.contact()
    );
  });

  it("should call EMPBot start method when returnHome is invoked", () => {
    // const mockEMPBot: BotInterface = new MockEMPBot();
    const empBot = new EMPBot(mockCtx);

    const commandInstance = new CommandHandler(mockCtx, empBot);

    const startSpy = jest.spyOn(empBot, "start");

    commandInstance["returnHome"]();

    expect(startSpy).toHaveBeenCalledWith("start");
  });
});
